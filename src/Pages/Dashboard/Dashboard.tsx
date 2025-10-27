import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import MainDashboard from "./MainDashboard";
import Task from "../Task/Task";






const Dashboard=()=>{
    interface Menu{
        name: string;
        icon: string
    }
    const menu:Menu[]=[
        {name:"داشبورد" , icon:"bi bi-house"},
        {name:"تنظیمات" , icon:"bi bi-gear"},
        {name:"گزارش ها" , icon:"bi bi-bar-chart"}
    ]

    const [isActive , setIsActive]= useState<number>(0);
    const [selectedTaskId , setSelectedTaskId]= useState<number | null>(null)

    return(
        <div className="w-full flex flex-col">
            <div className="w-full">
                <Navbar/>
            </div>
            <div className="flex flex-row-reverse justify-between items-start">
                <ul className="min-h-[80vh] w-[20%] rounded-[5px] flex flex-col gap-4 border-l-[1px] border-b-[1px] border-t-[1px] border-[#B0B8C1] justify-start items-end px-4 py-3">
                    {menu.map((item,index)=>{
                        return(
                            <li onClick={()=>setIsActive(index)} key={index} className={`${isActive === index ? "bg-[#E9EDF3]" : "bg-transparent"} w-full px-3 py-1 rounded-md cursor-pointer flex justify-end gap-3 text-[#2C3E50] transition-all duration-300 ease-in-out`}>
                                <p>{item.name}</p>
                                <i className={`${item.icon}`}></i>
                            </li>
                        )
                    })}
                </ul>
                <div className="min-h-[80vh] w-[80%]">
                    {isActive === 0 && !selectedTaskId ? (
                        <MainDashboard setSelectedTaskId={setSelectedTaskId} />
                    ) : isActive === 0 && selectedTaskId ? (
                        <Task taskId={selectedTaskId} setSelectedTaskId={setSelectedTaskId} />
                    ) : null}

                </div>
            </div>
        </div>
    )
}

export default Dashboard;