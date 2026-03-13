"use client";

import { useEffect, useState } from "react";
import apiFetch from "@/lib/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function loadAnalytics() {
    try {
      const res = await apiFetch.get("/tasks/analytics/daily");
      setData(res.data);
    } catch (err) {
      console.error("Failed to load analytics", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <p className="text-gray-500">Loading analytics...</p>
      </div>
    );
  }

  // ✅ Chart Data
  const chartData = [
    { name: "Tasks", value: data?.total_tasks || 0 },
    { name: "Minutes", value: data?.total_time_minutes || 0 },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Header */}
      <h1 className="text-2xl font-bold">📊 Analytics</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Total Tasks */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Total Tasks Today</p>
          <h2 className="text-3xl font-bold mt-2">
            {data?.total_tasks ?? 0}
          </h2>
        </div>

        {/* Total Time */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Time Spent Today</p>
          <h2 className="text-3xl font-bold mt-2">
            {data?.total_time_minutes ?? 0} min
          </h2>
        </div>

      </div>

      {/* ✅ Chart Section */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Today's Summary</h2>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Motivation */}
      <div className="bg-blue-600 text-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">
          Keep Going 🚀
        </h2>
        <p className="text-blue-100">
          Small consistent efforts lead to big results. Stay focused and keep building.
        </p>
      </div>

    </div>
  );
}