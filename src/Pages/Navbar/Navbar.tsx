import { useUser } from "../Context/userContext/UseUser";



interface NavbarProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ setIsOpen, isOpen }) => {
    const { user }= useUser();

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    return(
        <div className="relative w-full flex flex-row-reverse justify-between shadow-sm shadow-[#F5F7FA] pr-10 lg:px-10 py-3 items-center m-0 p-0 border-b border-[#F5F7FA]">
                {isOpen ? <i onClick={handleToggle} className="bi bi-x absolute cursor-pointer top-1/2 -translate-y-1/2 right-3 text-[#6B7280] text-[30px] block lg:hidden"></i>
                        : <i onClick={handleToggle} className="bi bi-list absolute cursor-pointer top-1/2 -translate-y-1/2 right-3 text-[#6B7280] text-[30px] block lg:hidden"></i>    
            }
            <div className="flex flex-row-reverse justify-center items-center gap-7 mr-7 lg:mr-0">
                <div className="w-[50px] h-[50px] rounded-[50%]">
                    <img className="w-full h-full rounded-[50%]" src={user?.profilIMG || "/assets/user.png"} alt="" />
                </div>
                <div className="">
                    <i className="bi bi-bell text-[#2C3E50] text-[18px] cursor-pointer" aria-hidden="true"></i>
                </div>
                <div className="">
                    <i className="bi bi-search text-[#2C3E50] text-[18px] cursor-pointer" aria-hidden="true"></i>
                </div>
            </div>
            <div className="">
                <img src="/assets/Logo.png" className="w-[70px] h-[70px] rounded-[50%]" alt="" />
            </div>
        </div>
    )
}

export default Navbar;