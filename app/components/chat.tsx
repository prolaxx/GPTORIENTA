"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./chat.module.css";
import Markdown from "react-markdown";

interface RequiredActionFunctionToolCall {
  function: {
    name: string;
    arguments: string;
  };
  id: string;
  type: string;
}

type MessageType = {
  role: "user" | "assistant";
  text: string;
};

const UserMessage = ({ text }: { text: string }) => {
  return <div className={styles.userMessage}>{text}</div>;
};

const AssistantMessage = ({ text }: { text: string }) => {
  return (
    <div className={styles.assistantMessage}>
      <Markdown>{text}</Markdown>
    </div>
  );
};

const Message = ({ role, text }: MessageType) => {
  switch (role) {
    case "user":
      return <UserMessage text={text} />;
    case "assistant":
      return <AssistantMessage text={text} />;
    default:
      return null;
  }
};

type ChatProps = {
  initialMessage?: string | null;
  functionCallHandler: (call: RequiredActionFunctionToolCall) => Promise<string>;
};

const Chat = ({ initialMessage, functionCallHandler }: ChatProps) => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const assistantMessageRef = useRef<string>(""); // Ref para acumular los fragmentos

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const createThread = async () => {
      const res = await fetch(`/api/assistants/threads`, {
        method: "POST",
      });
      const data = await res.json();
      setThreadId(data.threadId);
    };
    createThread();
  }, []);

  useEffect(() => {
    if (initialMessage) {
      sendMessage(initialMessage, false);
    }
  }, [initialMessage]);

  const sendMessage = async (text: string, displayUserMessage = true) => {
    if (!text.trim()) return;
    if (!threadId) {
      console.error("No se puede enviar el mensaje. threadId no es válido:", threadId);
      return;
    }

    if (displayUserMessage) {
      appendMessage("user", text);
    }

    setUserInput("");
    setInputDisabled(true);

    try {
      const response = await fetch(
        `/api/assistants/threads/${threadId}/messages`,
        {
          method: "POST",
          body: JSON.stringify({
            content: text,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.body) {
        console.error("No se recibió respuesta del servidor.");
        setInputDisabled(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      assistantMessageRef.current = ""; // Reiniciar el acumulador para el nuevo mensaje

      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Dividir el buffer en líneas
        let lines = buffer.split(/\r?\n/);

        // Mantener el último fragmento en el buffer si no termina con una nueva línea
        if (!buffer.endsWith("\n")) {
          buffer = lines.pop() || "";
        } else {
          buffer = "";
        }

        for (let line of lines) {
          // Eliminar espacios en blanco
          line = line.trim();

          // Ignorar líneas vacías
          if (!line) continue;

          if (line.startsWith("data: ")) {
            line = line.slice("data: ".length);
          }

          if (line === "[DONE]") {
            setInputDisabled(false);
            break;
          }

          try {
            const parsed = JSON.parse(line);

            if (parsed.event === "thread.message.delta" && parsed.data?.delta?.content) {
              const contentParts = parsed.data.delta.content;

              for (const part of contentParts) {
                const content = part?.text?.value || "";

                // Acumular fragmentos en assistantMessageRef
                assistantMessageRef.current += content;

                // Actualizar los mensajes a medida que se recibe cada fragmento
                setMessages((prevMessages) => {
                  const lastMessage = prevMessages[prevMessages.length - 1];
                  if (lastMessage && lastMessage.role === "assistant") {
                    const updatedMessage: MessageType = {
                      role: "assistant",
                      text: assistantMessageRef.current,
                    };
                    return [...prevMessages.slice(0, -1), updatedMessage];
                  } else {
                    const newMessage: MessageType = {
                      role: "assistant",
                      text: assistantMessageRef.current,
                    };
                    return [...prevMessages, newMessage];
                  }
                });
              }
            }

            if (parsed.event === "thread.message.completed") {
              setInputDisabled(false);
            }

          } catch (error) {
            console.warn("No es un JSON válido, acumulando en buffer:", line);
            // Aquí no ignoramos el chunk, ya que podría ser parte de un JSON incompleto
            // Lo dejamos en el buffer para la siguiente iteración
            buffer = line;
          }
        }
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }

    setInputDisabled(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(userInput);
  };

  const appendMessage = (role: "user" | "assistant", text: string) => {
    setMessages((prevMessages) => [...prevMessages, { role, text }]);
  };

  const handleStartOrientation = () => {
    const formData = localStorage.getItem("formData");
    if (formData) {
      sendMessage(formData, false);
    } else {
      console.error("No hay respuestas almacenadas localmente.");
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} text={msg.text} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <input
          type="text"
          className={styles.input}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Escribe tu mensaje"
          disabled={inputDisabled}
        />
        <button type="submit" className={styles.button} disabled={inputDisabled}>
          Enviar
        </button>
      </form>
      <button className={styles.startButton} onClick={handleStartOrientation}>
        Iniciar Orientación
      </button>
    </div>
  );
};

export default Chat;
