import { useEffect, useState } from "react";

const SESSION_KEY = "dengage_session_token";

function generateToken(): string {
  return (
    Math.random().toString(36).substring(2) +
    Date.now().toString(36) +
    Math.random().toString(36).substring(2)
  );
}

export function useSessionToken(): string {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    let existing = localStorage.getItem(SESSION_KEY);
    if (!existing) {
      existing = generateToken();
      localStorage.setItem(SESSION_KEY, existing);
    }
    setToken(existing);
  }, []);

  return token;
}
