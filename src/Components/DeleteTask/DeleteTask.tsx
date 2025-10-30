import type { Task } from "../../Pages/Context/TaskContext/TaskContext";
import { useTasks } from "../../Pages/Context/TaskContext/useTasks";




interface DeleteTaskProps {
  task: Task;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showToast: (message: string, type: "success" | "error") => void;
  setSelectedTaskId: (id: number | null) => void;
}


const DeleteTask=({task , setIsOpen , showToast, setSelectedTaskId}:DeleteTaskProps)=>{
    const {setTasks}= useTasks();

    const handleDelete = (): void => {
        setIsOpen(false);
        setTimeout(() => {
            showToast(`تسک "${task.title}" با موفقیت حذف شد`, "success");
        }, 200);
        setTimeout(() => {
            setTasks((prev) => prev.filter((t) => t.taskId !== task.taskId));
            setSelectedTaskId(null);
        }, 2000);
    };


    return(
        <div className="flex flex-col justify-end items-end gap-5">
            <p className="text-[17px] text-[#2C3E50]">آیا از حذف تسک {task.title} مطمئن هستید؟</p>
            <div className="flex flex-row-reverse justify-center items-center gap-4">
                <button onClick={()=>handleDelete()} className="px-8 py-1 border border-[#6B7280] rounded-md text-[#2C3E50] transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-[#B0B8C1]">
                    حذف
                </button>
                <button onClick={()=>setIsOpen(false)} className="px-8 py-1 border border-[#6B7280] rounded-md text-[#2C3E50] transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-[#B0B8C1]">
                    لغو
                </button>
            </div>
        </div>
    )
}
export default DeleteTask