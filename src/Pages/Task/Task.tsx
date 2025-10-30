import { useState, type JSX } from "react";
// import { tasks } from "../../info/TaskInfo";
import Modal from "../../Modal/Modal";
import ChangeStatus from "../../Components/ChangeStatus/ChangeStatus";
import DeleteTask from "../../Components/DeleteTask/DeleteTask";
import EditTask from "../../Components/EditTask/EditTask";
import { useTasks } from "../Context/TaskContext/useTasks";


interface Toast {
    message: string; 
    type: "success" | "error" | ""
}
interface TaskProps {
  taskId: number;
  setSelectedTaskId: (id: number | null) => void;
}

const Task: React.FC<TaskProps> = ({ taskId, setSelectedTaskId }) => {
  const {tasks}=useTasks()
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
  const [toast, setToast] = useState<Toast>({
      message: "",
      type: "",
  });

  const task = tasks.find(t => t.taskId === taskId);

  if (!task) return <p>تسک یافت نشد.</p>;

  const openModal = (content: JSX.Element) => {
    setModalContent(content);
    setIsOpen(true);
  };
  const showToast = (message: string, type: "success" | "error"):void => {
      setToast({ message, type });
      setTimeout(() => setToast({ message: "", type: "" }), 2000);
  };

  return (
    <div className="w-full px-10 py-10 flex flex-col justify-center items-start gap-7">
      <div className="w-full flex flex-row-reverse justify-between items-start">
        <p className="text-[#2C3E50] text-[28px] font-semibold">{task.title}</p>
        <p onClick={() => setSelectedTaskId(null)} className="text-[#6B7280] flex justify-center items-start gap-1 cursor-pointer">
          <i className="bi bi-arrow-left"></i>
          <span>بازگشت</span>
        </p>
      </div>
      <div className="w-full flex flex-row-reverse justify-start items-start gap-10">
        <div className="flex flex-row-reverse justify-center items-center gap-3">
          <p dir="rtl" className="flex justify-center items-start gap-2">
            <i className="bi bi-grid text-[#6B7280] text-xl"></i>
            <span className="text-[#6B7280]">وضعیت :</span>
          </p>
          <span className="text-[13px] text-[#2C3E50] bg-[#B0B8C1] px-4 py-1 rounded-lg">
            {task.status === "pending" ? "در انتظار" : task.status === "in-progress" ? "در حال انجام" : "تکمیل شده"}
          </span>
        </div>
        <div className="flex flex-row-reverse justify-center items-center gap-3">
          <p dir="rtl" className="flex justify-center items-start gap-2">
            <i className="bi bi-flag text-[#6B7280] text-xl"></i>
            <span className="text-[#6B7280]">اولویت :</span>
          </p>
          <span className="text-[14px]">
            {task.priority === "high" && <p className="text-[#FFFFFF] bg-red-600 px-2 rounded-lg text-center">بالا</p>}
            {task.priority === "medium" && <p className="text-[#2C3E50] bg-[#B0B8C1] px-2 rounded-lg text-center">متوسط</p>}
            {task.priority === "low" && <p className="text-[#2C3E50] bg-[#E4E8EC] px-2 rounded-lg text-center">پایین</p>}
          </span>
        </div>
        <div className="flex flex-row-reverse justify-center items-center gap-3">
          <p dir="rtl" className="flex justify-center items-start gap-2">
            <i className="bi bi-calendar text-[#6B7280] text-xl"></i>
            <span className="text-[#6B7280]"> سررسید :</span>
          </p>
          <p className="text-[#6B7280]">{task.diary}</p>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-end gap-3">
        <p className="text-[#2C3E50] text-[18px]">توضیحات</p>
        <p dir="rtl" className="text-[#6B7280] text-[15px] text-justify">{task.description}</p>
      </div>
      <div className="w-full flex justify-end items-start gap-4 mt-4">
        <div
          className="flex justify-center items-center gap-1 px-5 rounded-md cursor-pointer h-[35px] bg-[#E74C3C] text-[#FFFFFF] transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-red-400"
          onClick={() => openModal(
            <DeleteTask task={task} setIsOpen={setIsOpen} showToast={showToast} setSelectedTaskId={setSelectedTaskId}/>
          )}
        >
          <p>حذف</p>
          <i className="bi bi-trash"></i>
        </div>
        <div
          className="flex justify-center items-center gap-1 px-5 rounded-md cursor-pointer h-[35px] bg-[#FFFFFF] text-[#2C3E50] border border-[#B0B8C1] transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-[#6B7280]"
          onClick={() => openModal(
            <EditTask task={task} setIsOpen={setIsOpen} showToast={showToast}/>
          )}
        >
          <p>ویرایش</p>
          <i className="bi bi-pencil-square"></i>
        </div>
        <div
          className="flex justify-center items-center gap-1 px-5 rounded-md cursor-pointer h-[35px] bg-[#F5F7FA] text-[#2C3E50] transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-[#6B7280]"
          onClick={() => openModal(
            <ChangeStatus task={task} isOpen={isOpen} setIsOpen={setIsOpen} showToast={showToast}/>
          )}
        >
          <p>تغییر وضعیت</p>
          <i className="bi bi-grid"></i>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {modalContent}
      </Modal>

      {/* Toast */}
        {toast.message && (
          <div dir="rtl"
            className={`fixed top-10 left-1/2 -translate-x-1/2 transform text-white px-6 py-3 rounded-2xl shadow-lg text-lg transition-all duration-300 ${
              toast.type === "success" ? "bg-green-500/80" : "bg-red-500/80"
              }`}
              >
              {toast.message}
          </div>
        )}
    </div>
  );
};

export default Task;
