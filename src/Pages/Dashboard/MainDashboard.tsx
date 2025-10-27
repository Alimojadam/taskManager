import { tasks } from "../../info/TaskInfo";
import { useUser } from "../Context/UseUser";



interface MainDashboardProps {
  setSelectedTaskId: (id: number) => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({ setSelectedTaskId }) => {

    const {user} = useUser();

    const userTasks = user?.tasksId
    ? tasks.filter(task => user.tasksId.includes(task.taskId))
    : [];

    const statuses = ["pending", "in-progress", "completed"] as const;
    console.log("current user:", user);


    const handleNavigate=(taskId: number, e?: React.MouseEvent)=>{
        e?.preventDefault();
        setSelectedTaskId(taskId)
    }


    return(
        <div className="w-full px-5 py-10 flex flex-col justify-center items-start gap-5">
            <div className="w-full flex justify-between items-start">
                <div className="px-[25px] py-[5px] rounded-[8px] bg-[#4A90E2] cursor-pointer flex flex-row-reverse justify-center items-center gap-2 transition-all duration-300 ease-in-out hover:scale-105">
                    <p>افزودن وظیفه جدید</p>
                    <p className="text-[25px]">+</p>
                </div>
                <div className="flex justify-center items-center">
                    <p className="text-[#2C3E50] text-[30px]">داشبورد</p>
                </div>
            </div>
            {userTasks.length > 0 ? (
            <div className="w-full flex gap-10 mt-10">
                {statuses.map(status => {
                const tasksForStatus = userTasks.filter(task => task.status === status);
                return (
                    <div key={status} className="w-full flex flex-col justify-start items-center gap-5">
                        <div className="w-full flex flex-col justify-start items-center gap-2">
                            <h3 className="font-bold text-lg text-[#2C3E50]">
                                {status === "pending"
                                ? "در انتظار"
                                : status === "in-progress"
                                ? "در حال انجام"
                                : "تکمیل شده"}
                            </h3>
                            <p dir="rtl" className="bg-[#F5F7FA] text-[#6B7280] text-[14px] flex justify-center items-center px-2 py-1 rounded-lg">{tasksForStatus.length} وظیفه</p>
                        </div>
                        <div className="w-full border-b border-[#B0B8C1]"></div>
                        <ul className="w-full flex flex-col justify-center items-center gap-4">
                            {tasksForStatus.length > 0 ? (
                            tasksForStatus.map(task => (
                                <li onClick={() => handleNavigate(task.taskId)} key={task.taskId} className="py-4 px-3 w-[350px] h-[150px] flex flex-col justify-start items-end border border-[#B0B8C1] rounded-md gap-3 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-[#E4E8EC]">
                                    <div className="">
                                        <p className="text-[#2C3E50]">{task.title}</p>
                                    </div>
                                    <div className="w-full flex justify-between items-start">
                                        <div className="text-[13px]">
                                            {task.priority==="high" && <p className="text-[#FFFFFF] bg-red-600 px-2 rounded-lg text-center">بالا</p>}
                                            {task.priority==="medium" && <p className="text-[#2C3E50] bg-[#B0B8C1] px-2 rounded-lg text-center">متوسط</p>}
                                            {task.priority==="low" && <p className="text-[#2C3E50] bg-[#E4E8EC] px-2 rounded-lg text-center">پایین</p>}
                                        </div>
                                        <div className="flex justify-center items-center gap-2 text-[#6B7280]">
                                            <p className="">{task.diary}</p>
                                            <i className="bi bi-calendar"></i>
                                        </div>
                                    </div>
                                    <div className="text-[#2C3E50] flex flex-row-reverse justify-center items-center gap-5 mt-1">
                                        <p className="border border-[#B0B8C1] px-4 py-1 rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-[#E4E8EC]">تغییر وضعیت</p>
                                        <p className="cursor-pointer px-2 py-1 transition-all duration-100 ease-in-out hover:border-b hover:border-[#B0B8C1]">حذف</p>
                                    </div>
                                </li>
                            ))
                            ) : (
                            <li className="text-gray-500">تسکی برای این وضعیت وجود ندارد.</li>
                            )}
                        </ul>
                    </div>
                );
                })}
            </div>
            ) : (
            <p className="mt-10 text-gray-500">تسکی برای نمایش وجود ندارد.</p>
            )}
        </div>
    )
}

export default MainDashboard;