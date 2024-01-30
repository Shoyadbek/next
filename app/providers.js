"use client";
import { TelegramProvider } from "./telegram.provider";

export default function Providers({ children }) {
  return <TelegramProvider>{children}</TelegramProvider>;
}
