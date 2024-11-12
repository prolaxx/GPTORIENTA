"use client";
import React from "react";
import styles from "../shared/page.module.css";

import Chat from "../../components/chat";
import FileViewer from "../../components/file-viewer";

interface RequiredActionFunctionToolCall {
  function: {
    name: string;
    arguments: string;
  };
  id: string;
  type: "function";
}

// Definir la función que manejará las llamadas de función
const functionCallHandler = async (call: RequiredActionFunctionToolCall): Promise<string> => {
  console.log("Function called:", call);
  return new Promise((resolve) => {
    resolve("Función procesada.");
  });
};

const FileSearchPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.column}>
          <FileViewer />
        </div>
        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            {/* Pasar la propiedad functionCallHandler */}
            <Chat functionCallHandler={functionCallHandler} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FileSearchPage;
