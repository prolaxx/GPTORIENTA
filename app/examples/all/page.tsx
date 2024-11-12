"use client";  // Esto asegura que el componente funcione como cliente

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Chat from "../../components/chat";  // Asegúrate que la ruta sea correcta

// Interfaz para definir la estructura de los argumentos de 'functionCallHandler'
interface RequiredActionFunctionToolCall {
  function: {
    name: string;
    arguments: string;
  };
  id: string;
  type: "function";
}

const Page = () => {
  const [initialMessage, setInitialMessage] = useState<string | null>(null);

  // Carga de datos simulada para obtener el mensaje inicial
  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      setInitialMessage("Mensaje de bienvenida: Datos recuperados");
    } else {
      setInitialMessage("Mensaje de bienvenida predeterminado");
    }
  }, []);

  // Definición del manejador para las llamadas a funciones
  const functionCallHandler = async (call: RequiredActionFunctionToolCall): Promise<string> => {
    console.log("Function called:", call);
    return new Promise((resolve) => {
      // Aquí puedes poner la lógica que procesará 'call'
      resolve("Llamada a función procesada.");
    });
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Renderizando el componente Chat y pasando functionCallHandler como propiedad */}
        <Chat initialMessage={initialMessage} functionCallHandler={functionCallHandler} />
      </div>
    </main>
  );
};

export default Page;
