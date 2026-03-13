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

  async function handleDelete(taskId: number) {
    if (!confirm("Delete this task?")) return;
    await deleteTask(taskId);
    fetchTasks();
  }

  function handleEdit(task: Task) {
    setEditingTask(task);
  }

  if (loading)
    return (
      <div className="flex justify-center mt-10">
        <p className="text-gray-500">Loading tasks...</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📋 My Tasks</h1>
      </div>

      {/* Create Task */}
      <CreateTaskForm onCreated={fetchTasks} />

      {/* Task List */}
      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <div className="text-center text-gray-500 py-10 bg-white rounded-lg shadow-sm">
            No tasks yet. Create one 🚀
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition"
            >
              {/* Top */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{task.title}</h3>

                  {task.description && (
                    <p className="text-sm text-gray-500 mt-1">
                      {task.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Timer */}
              <div className="mt-3">
                <TaskTimer taskId={task.id} />
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(task)}
                  className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-100"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(task.id)}
                  className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
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