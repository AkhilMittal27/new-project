"use client";

import { useEffect, useState } from "react";
import {
  startTask,
  stopTask,
  getTaskTimeStatus,
} from "@/services/task.services";

export default function TaskTimer({ taskId }: { taskId: number }) {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [loading, setLoading] = useState(false);

  async function fetchStatus() {
    try {
      const data = await getTaskTimeStatus(taskId);
      setRunning(data.running);
      setElapsed(data.elapsed_seconds);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchStatus();

    const interval = setInterval(() => {
      fetchStatus();
    }, 5000); // poll every 5s

    return () => clearInterval(interval);
  }, [taskId]);

  async function handleStart() {
    setLoading(true);
    await startTask(taskId);
    await fetchStatus();
    setLoading(false);
  }

  async function handleStop() {
    setLoading(true);
    await stopTask(taskId);
    await fetchStatus();
    setLoading(false);
  }

  return (
    <div className="flex items-center gap-3 mt-2">
      <span className="text-sm text-gray-600">
        ⏱ {Math.floor(elapsed / 60)}m {elapsed % 60}s
      </span>

      {running ? (
        <button
          onClick={handleStop}
          disabled={loading}
          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
        >
          Stop
        </button>
      ) : (
        <button
          onClick={handleStart}
          disabled={loading}
          className="bg-green-600 text-white px-2 py-1 rounded text-sm"
        >
          Start
        </button>
      )}
    </div>
  );
}