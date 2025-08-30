import { useEffect, useState } from "react";

const KEY = "tablecrm_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(KEY);
}

export function setToken(token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, token);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

export function useToken() {
  const [token, set] = useState<string | null>(null);
  useEffect(() => { set(getToken()); }, []);
  return { token, refresh: () => set(getToken()) };
}
