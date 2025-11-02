import { useTasks } from "../Context/TaskContext/useTasks";
import { useUser } from "../Context/userContext/UseUser";

const Reports = () => {
  const { user } = useUser();
  const { tasks } = useTasks();

  interface ToDosType {
    title: string;
    count: number;
  }

  const userTasks = user?.tasksId
    ? tasks.filter((task) => user.tasksId.includes(task.taskId))
    : [];

  const highPriorityCount:number = userTasks.filter((task) => task.priority === "high").length;
  const completedCount:number = userTasks.filter((task) => task.status === "completed").length;
  const totalCount:number = userTasks.length;
  const completedPercent:number = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const toDos: ToDosType[] = [
    { title: "وظایف با اولویت بالا", count: highPriorityCount },
    { title: "وظایف تکمیل شده", count: completedCount },
    { title: "وظایف کلی", count: totalCount },
  ];


    return(
        <div className="w-full px-5 py-10 flex flex-col gap-10 justify-start items-end">
            <div className="flex flex-col justify-start items-end gap-2">
                <h4 className="font-bold text-[30px] text-[#2C3E50]">گزارش ها</h4>
                <p className="text-[17px] text-[#6B7280]">
                    !..نمای کلی عملکرد مدیریت وظایف شما
                </p>
            </div>
            <div className="w-full lg:w-[70%] flex justify-between items-start">
                {toDos.map((item,index)=>(
                    <div key={index} className="flex flex-col justify-start item-center gap-1">
                        <p className="text-[#6B7280] text-[13px]">{item.title}</p>
                        <div className={`${item.title === "وظایف تکمیل شده" && "flex gap-1"} text-[#2C3E50] text-[30px]`}>
                            <p className="">{item.count}</p>
                            {item.title === "وظایف تکمیل شده" && totalCount >= 0 && (
                                <p>({completedPercent}%)</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full border-t border-[#B0B8C1]"></div>
            <div className="flex justify-between items-start">
                <div className="flex flex-col justify-start items-end gap-10">
                    <p className="text-[#2C3E50] text-[23px]">نرخ تکمیل وظایف</p>
                    <div className="w-full flex flex-col justify-center items-center lg:items-end gap-3 mx-10">
                        <div
                        className="w-[250px] h-[250px] rounded-full flex justify-center items-center"
                        style={{
                            background: `conic-gradient(#4A90E2 0deg ${completedPercent * 3.6}deg, #B0B8C1 0deg 360deg)`,
                        }}
                        >
                        <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center">
                            <p className="text-[#2C3E50] text-[30px]">{completedPercent}%</p>
                        </div>
                        </div>

                        <div className="w-[250px] flex flex-col justify-center items-center gap-2 mt-5">
                        <div className="w-[90px] flex flex-row-reverse justify-between items-center gap-3">
                            <p className="text-[#2C3E50] text-[13px]">تکمیل شده</p>
                            <p className="w-[10px] h-[10px] bg-[#4A90E2] mt-1"></p>
                        </div>
                        <div className="w-[90px] flex flex-row-reverse justify-between items-center gap-3">
                            <p className="text-[#2C3E50] text-[13px]">باقی مانده</p>
                            <p className="w-[10px] h-[10px] bg-[#B0B8C1] mt-1"></p>
                        </div>
                        </div>
                    </div>
                </div>
                <div className=""></div>
            </div>
        </div>
    )
}

export default Reports;