"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-lg ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="w-64 bg-white border-r min-h-screen p-5">
      <h2 className="text-xl font-bold mb-6">🧠 Task Manager</h2>

      <nav className="flex flex-col gap-2">
        <Link href="/tasks" className={linkClass("/tasks")}>
          📋 Tasks
        </Link>

        <Link href="/analytics" className={linkClass("/analytics")}>
          📊 Analytics
        </Link>
      </nav>
    </div>
  );
}