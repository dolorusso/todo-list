import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Iniciar Prisma Client dentro de cada handler
// y cerrar la conexión después de cada operación
export async function GET() {
  const prisma = new PrismaClient();
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks || []);  // Devuelve un array vacío si hay un error
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  } finally {
    await prisma.$disconnect();  // Cerrar conexión
  }
}

export async function POST(req: Request) {
  const prisma = new PrismaClient();
  try {
    const { text } = await req.json();
    if (!text || text.trim() === "") {
      return NextResponse.json({ error: "Task text is required" }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: { text, completed: false },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  } finally {
    await prisma.$disconnect();  // Cerrar conexión
  }
}

export async function PUT(req: Request) {
  const prisma = new PrismaClient();
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
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  } finally {
    await prisma.$disconnect();  // Cerrar conexión
  }
}

export async function DELETE(req: Request) {
  const prisma = new PrismaClient();
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    await prisma.task.delete({ where: { id } });

    return NextResponse.json({ message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  } finally {
    await prisma.$disconnect();  // Cerrar conexión
  }
}