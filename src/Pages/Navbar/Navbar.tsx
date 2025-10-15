// import { useUser } from "../Context/UseUser";
import profilIMG from "./../../assets/profile.jpg"



const Navbar=()=>{
    // const { user }= useUser();
    return(
        <div className="w-full flex flex-row-reverse justify-between shadow-sm shadow-[#F5F7FA] px-10 py-3 items-center m-0 p-0 border-b border-[#F5F7FA]">
            <div className="flex flex-row-reverse justify-center items-center gap-7">
                <div className="w-[50px] h-[50px] rounded-[50%]">
                    <img className="w-full h-full rounded-[50%]" src={profilIMG} alt="" />
                </div>
                <div className="">
                    <i className="bi bi-bell text-[#2C3E50] text-[18px] cursor-pointer" aria-hidden="true"></i>
                </div>
                <div className="">
                    <i className="bi bi-search text-[#2C3E50] text-[18px] cursor-pointer" aria-hidden="true"></i>
                </div>
            </div>
            <div className="">
                <img src="src/assets/Logo.png" className="w-[70px] h-[70px] rounded-[50%]" alt="" />
            </div>
        </div>
    )
}

export default Navbar;