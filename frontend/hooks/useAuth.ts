"use client";

import { useEffect, useState } from "react";
import { getMe } from "@/services/auth.services";
import { useAuthStore } from "@/store/auth.store";

export function useAuth() {
  const { setAuth, logout, token } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem("token");

        if (!storedToken) throw new Error();

        const user = await getMe();

        setAuth(user, storedToken);
        setIsAuthenticated(true);
      } catch {
        logout();
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return { loading, isAuthenticated };
}