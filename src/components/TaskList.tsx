import TaskItem from "../components/TaskItem";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  toggleTask: (id: number, completed: boolean) => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, newText: string, completed:boolean) => void; 
}

export default function TaskList({ tasks, toggleTask, deleteTask, updateTask }: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      ))}
    </ul>
  );
}