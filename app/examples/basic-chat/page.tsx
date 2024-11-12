"use client";

import React from "react";
import styles from "./page.module.css";
import Chat from "../../components/chat";  // Asegúrate de ajustar la ruta de acuerdo a tu estructura
interface RequiredActionFunctionToolCall {
  function: {
    name: string;
    arguments: string;
  };
  id: string;
  type: "function";
}
// Definición del manejador de llamadas a funciones
const functionCallHandler = async (call: RequiredActionFunctionToolCall): Promise<string> => {
  console.log("Function called:", call);
  return new Promise((resolve) => {
    resolve("Función procesada.");
  });
};

const Home = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Aquí debes pasar la propiedad functionCallHandler */}
        <Chat functionCallHandler={functionCallHandler} />
      </div>
    </main>
  );
};

export default Home;
