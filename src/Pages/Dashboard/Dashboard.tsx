import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import MainDashboard from "./MainDashboard";
import Task from "../Task/Task";
import Settings from "../Settings/Settings";
import { useUser } from "../Context/userContext/UseUser";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Reports from "../Reports/Reports";






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

    const {setUser}= useUser()
    const [isActive , setIsActive]= useState<number>(0);
    const [selectedTaskId , setSelectedTaskId]= useState<number | null>(null)
    const navigate=useNavigate();

    const handleLogOut=():void=>{
        setUser(null);
        navigate("/")
    }

    return(
        <div className="w-full flex flex-col">
            <div className="w-full">
                <Navbar/>
            </div>
            <div className="flex flex-row-reverse justify-between items-start">
                <ul className="min-h-screen h-auto w-[20%] rounded-[5px] flex flex-col gap-4 border-l-[1px] border-b-[1px] border-t-[1px] border-[#B0B8C1] justify-start items-end px-4 py-3">
                    {menu.map((item,index)=>{
                        return(
                            <li onClick={()=>setIsActive(index)} key={index} className={`${isActive === index ? "bg-[#E9EDF3]" : "bg-transparent"} w-full px-3 py-1 rounded-md cursor-pointer flex justify-end gap-3 text-[#2C3E50] transition-all duration-300 ease-in-out`}>
                                <p>{item.name}</p>
                                <i className={`${item.icon}`}></i>
                            </li>
                        )
                    })}
                    <div className="w-full border-b border-[#6B7280]"></div>
                    <li onClick={handleLogOut} className={`bg-transparent w-full px-3 py-1 rounded-md cursor-pointer flex justify-end gap-3 text-[#2C3E50] transition-all duration-300 ease-in-out`}>
                        <p>خروج از حساب</p>
                        <i className="bi bi-box-arrow-right"></i>
                    </li>
                </ul>
                <div className="min-h-[80vh] w-[80%]">
                    {isActive === 0 && !selectedTaskId ? (
                        <MainDashboard setSelectedTaskId={setSelectedTaskId} />
                    ) : isActive === 0 && selectedTaskId ? (
                        <Task taskId={selectedTaskId} setSelectedTaskId={setSelectedTaskId} />
                    ) : null}
                    {isActive === 1 && <Settings/>}
                    {isActive === 2 && <Reports/>}

                </div>
            </div>
            <div className="w-full flex justify-center items-center">
                <Footer/>
            </div>
        </div>
    )
}

export default Dashboard;