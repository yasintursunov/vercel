import { getToken } from "./storage";
import type { SalePayloadItem, CreateSaleResponse } from "@/types";

const BASE = "https://app.tablecrm.com/api/v1";

export async function createDocSale(payload: SalePayloadItem[]): Promise<CreateSaleResponse> {
  const token = getToken();
  if (!token) throw new Error("Нет токена. Сначала авторизуйтесь.");

  const res = await fetch(`${BASE}/docs_sales/?token=${encodeURIComponent(token)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ошибка API (${res.status}): ${text}`);
  }
  return res.json();
}
