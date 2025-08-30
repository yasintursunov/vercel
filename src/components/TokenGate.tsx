"use client";

import { useState } from "react";
import { setToken, clearToken, useToken } from "@/lib/storage";

export default function TokenGate() {
  const [input, setInput] = useState("");
  const { refresh } = useToken();

  const onSave = () => {
    if (!input.trim()) return;
    setToken(input.trim());
    refresh();
  };

  return (
    <section className="rounded-xl border bg-white p-4 shadow-sm">
      <h2 className="mb-2 text-lg font-medium">Авторизация кассы (token)</h2>
      <p className="mb-3 text-sm text-zinc-600">
        Вставьте токен кассы из TableCRM и сохраните.
      </p>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="вставьте токен здесь"
        className="w-full rounded-lg border px-3 py-2 text-sm"
      />

      <div className="mt-3 flex gap-2">
        <button onClick={onSave} className="rounded-lg bg-blue-600 px-4 py-2 text-white">
          Сохранить
        </button>
        <button
          onClick={() => { clearToken(); refresh(); }}
          className="rounded-lg border px-4 py-2"
        >
          Очистить
        </button>
      </div>
    </section>
  );
}
