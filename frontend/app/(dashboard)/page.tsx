"use client"

import useTasks from "@/hooks/useTask"
import TaskCard from "@/components/tasks/TaskCard"

export default function Dashboard() {
  const { tasks, start, stop, remove } = useTasks()

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Tasks</h1>

      {tasks.map((task: any) => (
        <TaskCard
          key={task.id}
          task={task}
          onStart={() => start(task.id)}
          onStop={() => stop(task.id)}
          onDelete={() => remove(task.id)}
        />
      ))}
    </div>
  )
}