import { createContext } from "react";

export interface Task {
  taskId: number;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  diary: string;
}

export interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  updateTask: <K extends keyof Task>(taskId: number, key: K, value: Task[K]) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);
