import { useState } from "react";
import type { Task } from "../../Pages/Context/TaskContext/TaskContext";
import { useTasks } from "../../Pages/Context/TaskContext/useTasks";

interface EditTaskProps {
  task: Task;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showToast: (message: string, type: "success" | "error") => void;
}

const EditTask = ({ task, setIsOpen, showToast }: EditTaskProps) => {
  const { updateTask } = useTasks();

  const [description, setDescription] = useState<string>(task.description);
  const [diary, setDiary] = useState<string>(task.diary);
  const [selectedPriority, setSelectedPriority] = useState<Task["priority"]>(task.priority);

  const priorityLabels: Record<"low" | "medium" | "high", string> = {
    low: "پایین",
    medium: "متوسط",
    high: "بالا",
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      showToast("تغییرات با موفقیت اعمال شدند", "success");
    }, 200);
    setTimeout(() => {
      updateTask(task.taskId, "description", description);
      updateTask(task.taskId, "diary", diary);
      updateTask(task.taskId, "priority", selectedPriority);
    }, 300);
  };

  return (
    <div className="w-full flex flex-col justify-start items-end gap-4">
      <p className="w-full text-center text-[18px] text-[#2C3E50]">{task.title}</p>
      <form
        onSubmit={handleEdit}
        dir="rtl"
        action=""
        className="w-full flex flex-col justify-start items-start"
      >
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <label htmlFor="" className="text-[16px] text-[#2C3E50]">
            توضیحات
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full lg:w-[450px] outline-none bg-transparent resize-none h-[100px] border border-[#B0B8C1] rounded-md px-2 py-1 text-[14px] text-[#2C3E50]"
          />
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-2 mt-5">
          <label htmlFor="" className="text-[16px] text-[#2C3E50]">
            سررسید
          </label>
          <input
            type="text"
            id="dueDate"
            value={diary}
            placeholder="روز-ماه-سال"
            className="w-full lg:w-[450px] outline-none bg-transparent resize-none border border-[#B0B8C1] rounded-md px-2 py-1 text-[14px] text-[#2C3E50]"
            onChange={(e) => setDiary(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-2 mt-5">
          <p className="text-[16px] text-[#2C3E50]">اولویت</p>
          <div className="flex flex-row-reverse gap-4">
            {(["low", "medium", "high"] as Task["priority"][]).map((p) => (
              <label key={p} className="flex items-center gap-2 text-[#2C3E50]">
                <input
                  type="radio"
                  name="priority"
                  value={p}
                  checked={selectedPriority === p}
                  onChange={() => setSelectedPriority(p)}
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
            تایید
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

export default EditTask;
