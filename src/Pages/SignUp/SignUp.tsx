import { useState } from "react";
import { users } from "../../info/userInfo";
import { useNavigate } from "react-router-dom";
import type { User } from "../../info/userInfo";


const SignUp=()=>{

    interface Toast {
        message: string; 
        type: "success" | "error" | ""
    }

    const [name,setName]=useState<string>("")
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [confirmPass, setConfirmPass] = useState<string>("");
    const [showPass, setShowPass] = useState<boolean>(false);
    const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
    const [toast, setToast] = useState<Toast >({
        message: "",
        type: "",
    });

    const LoginNavigate=useNavigate();
    
    
    const handleSignUp = (): void => {

        if(!name.trim() || !email.trim() || !pass.trim() || !confirmPass.trim() ){
            showToast("همه فیلد ها باید پر شوند", "error");
            return
        }
        if (pass.length < 8) {
            showToast("رمز عبور باید حداقل ۸ کاراکتر باشد!", "error")
            return;
        }
        if( pass !== confirmPass){
            showToast("رمز عبور و تکرار رمز عبور یکسان نیستند","error");
            return;
        }


        const foundUser = users.find(user => user.email === email);

        if (foundUser) {
            showToast(`این حساب کاربری وجود دارد!`, "error");
            return;
            
        }
        const newUser: User = { name, email, pass };
        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));
        showToast("حساب کاربری با موفقیت ایجاد شد!", "success");
        setTimeout(() => LoginNavigate("/"), 2000);
    };

    const handleLoginNavigate=():void=>{

        LoginNavigate("/");
    }

    const showToast = (message: string, type: "success" | "error"):void => {
        setToast({ message, type });
        setTimeout(() => setToast({ message: "", type: "" }), 2000);
    };


    return(
        <div className="w-full min-h-[90vh] flex justify-center items-center overflow-hidden">
            <form onSubmit={
                (e)=>{
                    e.preventDefault();
                    handleSignUp();
                }
            }    className="w-[40%] flex flex-col justify-center items-center gap-5">
                <div className="flex justify-center items-center text-[40px]">
                    <div className="w-[75px] h-[75px]">
                        <img src="src/assets/Logo.png" alt="" />
                    </div>
                    <h1 className="text-[#4A90E2] font-bold">TaskFlow</h1>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 mt-3">
                    <h3 className="text-[#2C3E50] font-bold text-2xl">ساخت حساب</h3>
                    <p className="text-[#6B7280] text-[14px]">برای ادامه حساب کاربری بسازید</p>
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-2">
                    <div className="w-[50%] flex flex-col justify-center items-end gap-2">
                        <label className="text-[#6B7280]" htmlFor="">نام و نام خانوادگی</label>
                        <input dir="rtl" className="w-full h-[30px] bg-transparent px-[5px] outline-none border border-[#B0B8C1] rounded-[5px] text-[#2C3E50]"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                />
                    </div>
                    <div className="w-[50%] flex flex-col justify-center items-end gap-2">
                        <label className="text-[#6B7280]" htmlFor="">ایمیل</label>
                        <input dir="rtl" className="w-full h-[30px] bg-transparent px-[5px] outline-none border border-[#B0B8C1] rounded-[5px] text-[#2C3E50]"
                                placeholder="yourExampleEmail@email.com"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                    </div>
                    <div className="w-[50%] flex flex-col justify-center items-end gap-2">
                        <label className="text-[#6B7280]" htmlFor="">رمز عبور</label>
                        <div className="relative w-full">
                            <input dir="rtl" className="w-full h-[30px] bg-transparent px-[5px] outline-none border border-[#B0B8C1] rounded-[5px] text-[#2C3E50]"
                            type={showPass ? "text" : "password"}
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            />
                            <i
                                className={`bi ${showPass ? "bi-eye-slash" : "bi-eye"} absolute left-2 top-1/2 transform -translate-y-1/2 text-[17px] text-[#4A90E2] cursor-pointer`}
                                onClick={() => setShowPass(!showPass)}
                            ></i>
                        </div>
                    </div>
                    <div className="w-[50%] flex flex-col justify-center items-end gap-2">
                        <label className="text-[#6B7280]" htmlFor="">تکرار رمز عبور</label>
                        <div className="relative w-full">
                            <input dir="rtl" className="w-full h-[30px] bg-transparent px-[5px] outline-none border border-[#B0B8C1] rounded-[5px] text-[#2C3E50]"
                            type={showConfirmPass ? "text" : "password"}
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            />
                            <i
                                className={`bi ${showConfirmPass ? "bi-eye-slash" : "bi-eye"} absolute left-2 top-1/2 transform -translate-y-1/2 text-[17px] text-[#4A90E2] cursor-pointer`}
                                onClick={() => setShowConfirmPass(!showConfirmPass)}
                            ></i>
                        </div>
                    </div>
                </div>
                <button type="submit" className="w-1/2 h-8 bg-[#4A90E2] text-[#FFFFFF] font-bold rounded flex items-center justify-center cursor-pointer">
                    ایجاد حساب
                </button>
                <p onClick={handleLoginNavigate} className="text-[#4A90E2] cursor-pointer text-[15px] mt-2">حساب کاربری داری؟ ورود</p>

            </form>

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
    )
}

export default SignUp;