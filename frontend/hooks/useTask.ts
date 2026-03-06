import { useEffect, useState } from "react"
import * as taskService from "@/services/task.services"

export default function useTasks() {
  const [tasks, setTasks] = useState([])

  const loadTasks = async () => {
    const data = await taskService.getTasks()
    setTasks(data)
  }

  const addTask = async (task: any) => {
    await taskService.createTask(task)
    loadTasks()
  }

  const start = async (id: number) => {
    await taskService.startTimer(id)
    loadTasks()
  }

  const stop = async (id: number) => {
    await taskService.stopTimer(id)
    loadTasks()
  }

  const remove = async (id: number) => {
    await taskService.deleteTask(id)
    loadTasks()
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return { tasks, addTask, start, stop, remove }
}