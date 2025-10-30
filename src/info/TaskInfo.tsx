import { useState, type ReactNode } from "react";
import { TaskContext, type Task } from "../Pages/Context/TaskContext/TaskContext";

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      taskId: 1,
      title: "نوشتن گزارش هفتگی",
      description: "جمع‌بندی عملکرد تیم و آماده‌سازی گزارش برای جلسه روز دوشنبه",
      status: "in-progress",
      priority: "high",
      diary: "1404-08-05",
    },
    {
      taskId: 2,
      title: "بررسی ایمیل‌های کاری",
      description: "پاسخ‌دادن به ایمیل‌های مشتریان و شرکای تجاری",
      status: "pending",
      priority: "medium",
      diary: "1404-08-06",
    },
    {
      taskId: 3,
      title: "به‌روزرسانی وب‌سایت",
      description: "افزودن بخش اخبار جدید و اصلاح لینک‌های خراب",
      status: "completed",
      priority: "high",
      diary: "1404-08-03",
    },
  ]);

  const updateTask = <K extends keyof Task>(
    taskId: number,
    key: K,
    value: Task[K]
  ) => {
    setTasks((prev) =>
      prev.map((task) => (task.taskId === taskId ? { ...task, [key]: value } : task))
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
