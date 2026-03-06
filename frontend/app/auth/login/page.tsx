"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import apiFetch from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await apiFetch.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.access_token);

      router.push("/tasks");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto mt-20">
      <h1 className="text-xl font-bold">Login</h1>

      <input
        className="border p-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}