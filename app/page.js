"use client";

import { useTelegram } from "./telegram.provider";

export default function Home() {
  const telegram = useTelegram();
  return (
    <>
      <h2 className="text-2xl font-bold">
        Hello, {telegram.initDataUnsafe?.user?.first_name || "user"}
      </h2>
    </>
  );
}
