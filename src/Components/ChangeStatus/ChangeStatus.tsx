import { useState } from "react";
import Modal from "../../Modal/Modal";
import type { Task } from "../../Pages/Context/TaskContext/TaskContext";
import { useTasks } from "../../Pages/Context/TaskContext/useTasks";

interface ChangeStatusProps {
  task: Task;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showToast: (message: string, type: "success" | "error") => void;
}

const statusLabels: Record<'pending' | 'in-progress' | 'completed', string> = {
  pending: "در انتظار",
  "in-progress": "در حال انجام",
  completed: "تکمیل شده",
};

const ChangeStatus = ({ task, setIsOpen, showToast }: ChangeStatusProps) => {
  const [selectedStatus, setSelectedStatus] = useState<'pending' | 'in-progress' | 'completed'>(task.status);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const {updateTask}= useTasks();

  const handleChange = (status: 'pending' | 'in-progress' | 'completed'):void => {
    updateTask(task.taskId, "status", status);
    setIsOpen(false);
    setShowConfirmation(true);
    showToast(`وضعیت به ${statusLabels[status]} تغییر یافت`, "success");
    setTimeout(() => setShowConfirmation(false), 1500);
  };


  return (
    <>
      <div className="flex flex-col justify-end items-end gap-5">
        <p className="text-[17px] text-[#2C3E50]">
          وضعیت جدید تسک "{task.title}" را انتخاب کنید
        </p>
        <div className="flex flex-col gap-2">
          <label className="flex flex-row-reverse justify-start items-center gap-2 text-[#2C3E50]">
            <input
              type="radio"
              name="status"
              value="pending"
              checked={selectedStatus === "pending"}
              onChange={() => setSelectedStatus("pending")}
              className="accent-blue-600 cursor-pointer"
            />
            {statusLabels["pending"]}
          </label>
          <label className="flex flex-row-reverse justify-start items-center gap-2 text-[#2C3E50]">
            <input
              type="radio"
              name="status"
              value="in-progress"
              checked={selectedStatus === "in-progress"}
              onChange={() => setSelectedStatus("in-progress")}
              className="accent-blue-600 cursor-pointer"
            />
            {statusLabels["in-progress"]}
          </label>
          <label className="flex flex-row-reverse justify-start items-center gap-2 text-[#2C3E50]">
            <input
              type="radio"
              name="status"
              value="completed"
              checked={selectedStatus === "completed"}
              onChange={() => setSelectedStatus("completed")}
              className="accent-blue-600 cursor-pointer"
            />
            {statusLabels["completed"]}
          </label>
        </div>
        <div className="flex flex-row-reverse justify-center items-center gap-4">
          <button
            onClick={()=>handleChange(selectedStatus)}
            className="px-8 py-1 border border-[#6B7280] rounded-md text-[#2C3E50] transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-[#B0B8C1]"
          >
            تایید
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="px-8 py-1 border border-[#6B7280] rounded-md text-[#2C3E50] transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-[#B0B8C1]"
          >
            لغو
          </button>
        </div>
      </div>

      <Modal isOpen={showConfirmation} onClose={() => setShowConfirmation(false)}>
        <div className="flex justify-center items-center p-4 text-[#2C3E50]">
          تغییرات اعمال شدند
        </div>
      </Modal>
    </>
  );
};

export default ChangeStatus;
