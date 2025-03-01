import { useState, FormEvent } from "react";

interface TaskFormProps {
  addTask: (text: string) => void;
}

export default function TaskForm({ addTask }: TaskFormProps) {
  const [task, setTask] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-r">
        Agregar
      </button>
    </form>
  );
}