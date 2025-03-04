import { useState } from "react";
import Swal from "sweetalert2"; //uso esta libreria para el pop up

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  toggleTask: (id: number, completed: boolean) => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, newText: string, completed:boolean) => void;
}

export default function TaskItem({ task, toggleTask, deleteTask, updateTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [completed, setCompleted] = useState(task.completed);

  const handleUpdate = () => {
    updateTask(task.id, newText, completed);
    setIsEditing(false); 
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás recuperar esta tarea después de eliminarla.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      deleteTask(task.id);
      Swal.fire("Eliminada", "Tu tarea ha sido eliminada.", "success");
    }
  };

  return (
    <li className={`flex justify-between items-center p-4 mb-2 bg-purple-100 rounded-lg shadow-md transition transform hover:scale-105`}>
      <div className="flex items-center">
        {!isEditing && (
          <input
            type="checkbox"
            checked={completed}
            onChange={() => {
              setCompleted(!completed); 
              toggleTask(task.id, !completed); 
            }}
            className="mr-2 cursor-default"
          />
        )}
        {isEditing ? (
          <div className="flex items-center">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="border p-1 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button onClick={handleUpdate} className="bg-blue-500 text-white hover:bg-blue-600 rounded ml-1 px-2 py-1">Guardar</button>
          </div>
        ) : (
          <span
          onClick={() => toggleTask(task.id, completed)}
          className={`cursor-pointer ${completed ? "line-through text-gray-500"  : ""}`}
        >
          {newText}
        </span>
        )}
      </div>

      <div className="flex space-x-2">
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 text-white hover:bg-blue-600 rounded px-3 py-1"
        >
          Editar
        </button>
      )}
      <button
        className="bg-red-500 text-white hover:bg-red-600 rounded px-3 py-1"
        onClick={handleDelete}
      >
        Eliminar
      </button>
    </div>
    </li>
  );
}