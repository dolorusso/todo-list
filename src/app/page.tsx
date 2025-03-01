"use client";
import { useState, useEffect } from "react";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = async (text: string) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTask: Task = await res.json();
    setTasks([...tasks, newTask]);
  };

  const toggleTask = async (id: number, completed: boolean) => {
    const res = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed: !completed }),
    });
    const updatedTask: Task = await res.json();
    setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
  };

  const deleteTask = async (id: number) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const updateTask = async (id: number, newText: string, completed:boolean) => {
    const res = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, text: newText, completed }),
    });
    const updatedTask: Task = await res.json();
    setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-purple-300 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-purple-900 mb-6">TO-DO LIST</h1>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
    </div>
  );
}