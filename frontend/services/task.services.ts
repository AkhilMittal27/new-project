import apiFetch from "@/lib/api";

export async function getTasks() {
  const res = await apiFetch.get("/tasks");
  return res.data;
}

export async function createTask(payload: {
  title: string;
  description?: string;
  scheduled_date?: string;
  duration_minutes?: number;
}) {
  
  const res = await apiFetch.post("/tasks", payload);
  return res.data;
}

export async function startTask(taskId: number) {
  const res = await apiFetch.post(`/tasks/${taskId}/start`);
  return res.data;
}

export async function stopTask(taskId: number) {
  const res = await apiFetch.post(`/tasks/${taskId}/stop`);
  return res.data;
}

export async function getTaskTimeStatus(taskId: number) {
  const res = await apiFetch.get(`/tasks/${taskId}/time-status`);
  return res.data;
}