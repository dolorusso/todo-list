import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

//iniciar prisma
const prisma = new PrismaClient();

//obtener todas las tareas
export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks || []);
  } catch {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

//crear nueva tarea
export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text || text.trim() === "") {
      return NextResponse.json({ error: "Task text is required" }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: { text, completed: false },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}

//actualizar tarea
export async function PUT(req: Request) {
  try {
    const { id, completed, text } = await req.json();

    if (!id || typeof completed !== "boolean") {
      return NextResponse.json({ error: "Invalid task update data" }, { status: 400 });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { completed, text },
    });

    return NextResponse.json(updatedTask);
  } catch {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

//eliminar tarea
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    await prisma.task.delete({ where: { id } });

    return NextResponse.json({ message: "Task deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}