import { useState } from "react";
import { useTasks } from "../../Pages/Context/TaskContext/useTasks";
import { useUser } from "../../Pages/Context/userContext/UseUser";
import type { Task } from "../../Pages/Context/TaskContext/TaskContext";

interface AddTaskProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showToast: (message: string, type: "success" | "error") => void;
}

const AddTask: React.FC<AddTaskProps> = ({ setIsOpen, showToast }) => {
    const { tasks, setTasks } = useTasks();
    const { user, setUser } = useUser();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [priority, setPriority] = useState<Task["priority"]>("medium");
    const [dueDate, setDueDate] = useState<string>(""); 

    const priorityLabels: Record<"low" | "medium" | "high", string> = {
        low: "پایین",
        medium: "متوسط",
        high: "بالا",
    };

    const handleAdd = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();

        if (!title.trim()) {
            showToast("عنوان تسک نمی‌تواند خالی باشد", "error");
            return;
        }

        if (!dueDate.trim()) {
            showToast("تاریخ سررسید باید مشخص شود", "error");
            return;
        }

        if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(dueDate)) {
            showToast("فرمت تاریخ باید ''سال-ماه-روز'' باشد", "error");
            return;
        }

        if (!user) return;

        const newTask: Task = {
            taskId: tasks.length ? Math.max(...tasks.map(t => t.taskId)) + 1 : 1,
            title,
            description,
            status: "pending",
            priority,
            diary: dueDate,
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        const updatedUser = {
            ...user,
            tasksId: [...user.tasksId, newTask.taskId],
        };
        setUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        setIsOpen(false);
        showToast(`تسک "${title}" با موفقیت اضافه شد`, "success");
    };

    return (
        <div className="w-full flex flex-col justify-start items-end gap-4">
            <p className="w-full text-center text-[18px] text-[#2C3E50]">
                اضافه کردن تسک جدید
            </p>
            <form
                onSubmit={handleAdd}
                dir="rtl"
                className="w-full flex flex-col justify-start items-start gap-4"
            >
                <div className="w-full flex flex-col justify-start items-start gap-2">
                    <label className="text-[16px] text-[#2C3E50]">عنوان</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full max-w-[450px] outline-none bg-transparent border border-[#B0B8C1] rounded-md px-2 py-1 text-[14px] text-[#2C3E50]"
                    />
                </div>

                <div className="w-full flex flex-col justify-start items-start gap-2">
                    <label className="text-[16px] text-[#2C3E50]">توضیحات</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full max-w-[450px] outline-none bg-transparent resize-none h-[100px] border border-[#B0B8C1] rounded-md px-2 py-1 text-[14px] text-[#2C3E50]"
                    />
                </div>

                <div className="w-full flex flex-col justify-start items-start gap-2">
                    <label className="text-[16px] text-[#2C3E50]">تاریخ سررسید</label>
                    <input
                        type="text"
                        value={dueDate}
                        onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9-]/g, "");
                            setDueDate(val);
                        }}
                        placeholder="روز-ماه-سال"
                        className="w-full max-w-[450px] outline-none bg-transparent border border-[#B0B8C1] rounded-md px-2 py-1 text-[14px] text-[#2C3E50]"
                    />
                </div>

                <div className="w-full flex flex-col justify-start items-start gap-2">
                    <p className="text-[16px] text-[#2C3E50]">اولویت</p>
                    <div className="flex flex-row-reverse gap-4">
                        {(["low", "medium", "high"] as Task["priority"][]).map((p) => (
                            <label key={p} className="flex items-center gap-2 text-[#2C3E50]">
                                <input
                                    type="radio"
                                    name="priority"
                                    value={p}
                                    checked={priority === p}
                                    onChange={() => setPriority(p)}
                                    className="accent-blue-600 cursor-pointer"
                                />
                                {priorityLabels[p]}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex justify-start items-end gap-4 mt-5">
                    <button
                        type="submit"
                        className="px-8 py-1 border border-[#6B7280] rounded-md text-[#2C3E50] transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-[#B0B8C1]"
                    >
                        اضافه کردن
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-8 py-1 border border-[#6B7280] rounded-md text-[#2C3E50] transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-[#B0B8C1]"
                    >
                        لغو
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTask;
