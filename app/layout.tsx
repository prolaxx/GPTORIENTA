import { Inter } from "next/font/google";
import "./globals.css";
import Warnings from "./components/warnings";
import { assistantId } from "./assistant-config";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Orientador Inteligente",
  description: "A quickstart template using the Assistants API with OpenAI",
  icons: {
    icon: "/Oi.svg", // Cambia la referencia al nuevo SVG
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {assistantId ? children : <Warnings />}
        <img className="logo" src="/Oi.svg" alt="Logo" /> {/* Actualiza la ruta del logo */}
      </body>
    </html>
  );
}
