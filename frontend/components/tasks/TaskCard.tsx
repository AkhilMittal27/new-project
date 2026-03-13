"use client";

import { useEffect, useState } from "react";
import { Task } from "@/types/task";

export default function TaskCard({
  task,
  onStart,
  onStop,
  onDelete,
}: {
  task: Task;
  onStart: () => Promise<void>;
  onStop: () => Promise<void>;
  onDelete: () => void;
}) {
  const [running, setRunning] = useState(task.is_running);
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(task.elapsed_seconds || 0);

  // 🔄 Sync when backend updates
  useEffect(() => {
    setRunning(task.is_running);
    setSeconds(task.elapsed_seconds || 0);
  }, [task]);

  // ⏱ live counter
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  function formatTime(sec: number) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  }

  async function handleStart() {
    if (running || loading) return;
    setLoading(true);

    try {
      await onStart();
      setRunning(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleStop() {
    if (!running || loading) return;
    setLoading(true);

    try {
      await onStop();
      setRunning(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border p-5 hover:shadow-md transition">

      {/* Title */}
      <h3 className="font-semibold text-lg">{task.title}</h3>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
      )}

      {/* Timer */}
      <div className="mt-3 text-sm font-medium text-blue-600">
        ⏱ {formatTime(seconds)}
      </div>

      {/* Status */}
      <div className="mt-2">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            running
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {running ? "Running" : "Stopped"}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-4">

        {/* Start */}
        <button
          onClick={handleStart}
          disabled={running || loading}
          className={`px-3 py-1.5 text-sm rounded-lg text-white transition ${
            running || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading && !running ? "Starting..." : "Start"}
        </button>

        {/* Stop */}
        <button
          onClick={handleStop}
          disabled={!running || loading}
          className={`px-3 py-1.5 text-sm rounded-lg text-white transition ${
            !running || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        >
          {loading && running ? "Stopping..." : "Stop"}
        </button>

        {/* Delete */}
        <button
          onClick={onDelete}
          disabled={loading}
          className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Delete
        </button>

      </div>
    </div>
  );
}