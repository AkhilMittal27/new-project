"use client";

import { useState } from "react";
import { updateTask } from "@/services/task.services";

export default function EditTaskModal({
  task,
  onUpdated,
  onClose,
}: {
  task: any;
  onUpdated: () => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    await updateTask(task.id, { title, description });
    setLoading(false);
    onUpdated();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 space-y-3">
        <h2 className="text-lg font-semibold">Edit Task</h2>

        <input
          className="border p-2 w-full rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-black text-white px-3 py-1 rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}