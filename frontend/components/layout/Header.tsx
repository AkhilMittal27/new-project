"use client";

import LogoutButton from "./LogoutButton";

export default function Header() {
  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <LogoutButton />
    </div>
  );
}