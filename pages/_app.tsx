import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";

const inter = Inter();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`h-full ${inter.className}`}>
      <Component {...pageProps} />
    </main>
  );
}
