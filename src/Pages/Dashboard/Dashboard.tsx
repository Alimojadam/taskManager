import { useEffect, useState } from "react";
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
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTaskId , setSelectedTaskId]= useState<number | null>(null)
    const navigate=useNavigate();

    const handleLogOut=():void=>{
        setUser(null);
        navigate("/")
    }
    useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

    return(
        <div className="relative w-full flex flex-col">
            <div className="w-full">
                <Navbar setIsOpen={setIsOpen} isOpen={isOpen}/>
            </div>
            <div className="flex flex-row-reverse justify-between items-start">
                <ul className={`${isOpen ? "w-[95%] backdrop-blur-lg" : "w-0"} fixed lg:relative overflow-hidden min-h-[90vh] lg:min-h-screen h-auto lg:w-[20%] rounded-[5px] flex flex-col gap-4 border-l-[1px] border-b-[1px] border-t-[1px] border-[#B0B8C1] z-[9999] lg:z-0 justify-start items-end lg:px-4 lg:py-3 transition-all ease-in-out duration-300`}>
                    {menu.map((item,index)=>{
                        return(
                            <li onClick={()=>{setIsActive(index);setIsOpen(false);}} key={index} className={`${isActive === index ? "bg-[#E9EDF3]" : "bg-transparent"} w-full px-3 py-1 rounded-md cursor-pointer flex justify-end gap-3 text-[#2C3E50] transition-all duration-300 ease-in-out`}>
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
                <div className="min-h-[80vh] w-full px-5 lg:px-0 lg:w-[80%]">
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