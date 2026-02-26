"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";
const navItems = [
  { name: "Tasks", href: "/tasks" },
  { name: "Analytics", href: "/analytics" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 h-screen bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Task Manager</h2>

      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`p-2 rounded ${
              pathname === item.href
                ? "bg-gray-700"
                : "hover:bg-gray-800"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-5 left-5">
        <LogoutButton />
      </div>
    </aside>
  );
}