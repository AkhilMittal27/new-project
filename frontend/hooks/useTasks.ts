import { useEffect, useState } from "react";
import * as taskService from "@/services/task.services";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: any) => {
    await taskService.createTask(task);
    loadTasks();
  };

  const start = async (id: number) => {
    await taskService.startTask(id);
    loadTasks();
  };

  const stop = async (id: number) => {
    await taskService.stopTask(id);
    loadTasks();
  };

  const remove = async (id: number) => {
    await taskService.deleteTask(id);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return { tasks, loading, addTask, start, stop, remove };
}