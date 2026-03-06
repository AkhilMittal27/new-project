type Props = {
  task: any
  onStart: () => void
  onStop: () => void
  onDelete: () => void
}

export default function TaskCard({ task, onStart, onStop, onDelete }: Props) {
  return (
    <div className="border p-4 rounded mb-3">
      <h3>{task.title}</h3>

      <div className="flex gap-2 mt-2">
        <button onClick={onStart}>Start</button>
        <button onClick={onStop}>Stop</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  )
}


