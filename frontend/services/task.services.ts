import { apiFetch } from "@/lib/api";

export async function getTasks() {
  return apiFetch("/tasks", {
    method: "GET",
  });
}

export async function createTask(payload: {
  title: string;
  description?: string;
  scheduled_date?: string;
  duration_minutes?: number;
}) {
  return apiFetch("/tasks", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function startTask(taskId: number) {
  return apiFetch(`/tasks/${taskId}/start`, {
    method: "POST",
  });
}

export async function stopTask(taskId: number) {
  return apiFetch(`/tasks/${taskId}/stop`, {
    method: "POST",
  });
}

export async function getTaskTimeStatus(taskId: number) {
  return apiFetch(`/tasks/${taskId}/time-status`);
}

export async function updateTask(taskId: number, payload: {
  title?: string;
  description?: string;
  completed?: boolean;
}) {
  return apiFetch(`/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteTask(taskId: number) {
  return apiFetch(`/tasks/${taskId}`, {
    method: "DELETE",
  });
}