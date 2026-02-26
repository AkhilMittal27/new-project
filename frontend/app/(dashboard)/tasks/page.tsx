"use client";

import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "@/services/task.services";
import CreateTaskForm from "@/components/tasks/CreateTaskForm";
import TaskTimer from "@/components/tasks/TaskTimer";
import EditTaskModal from "@/components/tasks/EditTaskModal";
import { Task } from "@/types/task";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // 🔄 Fetch tasks
  async function fetchTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🗑 Delete task
  async function handleDelete(taskId: number) {
    if (!confirm("Delete this task?")) return;

    await deleteTask(taskId);
    fetchTasks();
  }

  // ✏️ Edit task
  function handleEdit(task: Task) {
    setEditingTask(task);
  }

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="space-y-6">
      {/* ➕ Create Task */}
      <CreateTaskForm onCreated={fetchTasks} />

      {/* 📋 Tasks List */}
      <div>
        <h1 className="text-2xl font-semibold mb-4">My Tasks</h1>

        <div className="grid gap-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 border rounded-lg bg-white shadow-sm"
            >
              <h3 className="font-semibold">{task.title}</h3>

              {task.description && (
                <p className="text-sm text-gray-600">
                  {task.description}
                </p>
              )}

              {/* ⏱ Timer */}
              <TaskTimer taskId={task.id} />

              {/* ✏️ Edit + Delete */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(task)}
                  className="px-2 py-1 border rounded text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(task.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🪟 Edit Modal */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onUpdated={fetchTasks}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}