import api from "@/lib/api";

export async function getTasks() {
  const res = await api.get("/tasks");
  return res.data;
}

export async function createTask(payload: {
  title: string;
  description?: string;
  scheduled_date?: string;
  duration_minutes?: number;
}) {

  const res = await api.post("/tasks", payload);
  return res.data;
}

export async function startTask(taskId: number) {
  const res = await api.post(`/tasks/${taskId}/start`);
  return res.data;
}

export async function stopTask(taskId: number) {
  const res = await api.post(`/tasks/${taskId}/stop`);
  return res.data;
}

export async function getTaskTimeStatus(taskId: number) {
  const res = await api.get(`/tasks/${taskId}/time-status`);
  return res.data;
}

export async function deleteTask(taskId: number) {
  const res = await api.delete(`/tasks/${taskId}`);
  return res.data;
}

export async function updateTask(taskId: number, payload: any) {
  const res = await api.patch(`/tasks/${taskId}`, payload);
  return res.data;
}