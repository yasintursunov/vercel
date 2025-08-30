"use client";

import TokenGate from "@/components/TokenGate";
import SaleForm from "@/components/SaleForm";
import { useToken } from "@/lib/storage";

export default function Page() {
  const { token } = useToken();

  return (
    <main className="mx-auto max-w-md p-4">
      <h1 className="mb-3 text-xl font-semibold">Мобильное оформление продажи</h1>

      {!token ? (
        <TokenGate />
      ) : (
        <SaleForm />
      )}
    </main>
  );
}
