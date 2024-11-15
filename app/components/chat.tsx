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
  const [inputDisabled, setInputDisabled] = useState(true);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [orientationStarted, setOrientationStarted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const assistantMessageRef = useRef<string>(""); // Ref para acumular los fragmentos
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enfocar el campo de entrada cuando inputDisabled cambia a false
  useEffect(() => {
    if (!inputDisabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputDisabled]);

  const sendMessage = async (text: string, displayUserMessage = true, overrideThreadId?: string) => {
    const currentThreadId = overrideThreadId || threadId;

    if (!text.trim()) return;
    if (!currentThreadId) {
      console.error("No se puede enviar el mensaje. threadId no es válido:", currentThreadId);
      return;
    }

    if (displayUserMessage) {
      appendMessage("user", text);
    }

    setUserInput("");
    setInputDisabled(true);

    try {
      const response = await fetch(
        `/api/assistants/threads/${currentThreadId}/messages`,
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

      if (!response.ok) {
        throw new Error(`Error en el envío del mensaje: ${response.status}`);
      }

      if (!response.body) {
        console.error("No se recibió respuesta del servidor.");
        setInputDisabled(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      assistantMessageRef.current = "";

      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let lines = buffer.split(/\r?\n/);

        if (!buffer.endsWith("\n")) {
          buffer = lines.pop() || "";
        } else {
          buffer = "";
        }

        for (let line of lines) {
          line = line.trim();

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

                assistantMessageRef.current += content;

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

  const handleStartOrientation = async () => {
    const formData = localStorage.getItem("formData");
    if (!formData) {
      console.error("No hay respuestas almacenadas localmente.");
      return;
    }

    setOrientationStarted(true);

    try {
      const res = await fetch(`/api/assistants/threads`, {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error(`Error en la creación del thread: ${res.status}`);
      }
      const data = await res.json();
      if (!data.threadId) {
        throw new Error("El threadId no se generó correctamente.");
      }
      console.log("Nuevo threadId creado:", data.threadId);
      setThreadId(data.threadId);

      // Enviar el mensaje inicial con el threadId recién creado
      sendMessage(formData, false, data.threadId);
    } catch (error) {
      console.error("Error al crear el thread:", error);
      setOrientationStarted(false); // Rehabilitar el botón si hay un error
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
          ref={inputRef}
        />
        <button type="submit" className={styles.button} disabled={inputDisabled}>
          Enviar
        </button>
      </form>
      <button className={styles.startButton} onClick={handleStartOrientation} disabled={orientationStarted}>
        Iniciar Orientación
      </button>
    </div>
  );
};

export default Chat;

