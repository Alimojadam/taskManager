import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/userContext/UseUser";
import { users as importedUsers, type User } from "../../info/userInfo";

const Login = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "" }>({ message: "", type: "" });

  const navigate = useNavigate();

  const handleLogin = (): void => {
    if (pass.length < 8) {
      showToast("رمز عبور باید حداقل ۸ کاراکتر باشد!", "error");
      return;
    }

    const storedUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const mergedUsers: User[] = importedUsers.map(importedUser => {
      const existingUser = storedUsers.find(u => u.email === importedUser.email);
      return existingUser || importedUser;
    });

    storedUsers.forEach(u => {
      if (!mergedUsers.some(mu => mu.email === u.email)) {
        mergedUsers.push(u);
      }
    });

    const foundUser = storedUsers.find(u => u.email === email && u.pass === pass) 
                      || importedUsers.find(u => u.email === email && u.pass === pass);

    if (foundUser) {
      localStorage.setItem("users", JSON.stringify(mergedUsers));
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      setUser(foundUser);
      showToast(`ورود موفق! خوش آمدید ${foundUser.name}`, "success");
      setTimeout(() => navigate("/dashboard"), 1000);
    } else {
      showToast("ایمیل یا رمز عبور اشتباه است!", "error");
    }
  };

  const handleSignUpNavigate = (): void => {
    navigate("/SignUp");
  };

  const showToast = (message: string, type: "success" | "error"): void => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 2000);
  };

  return (
    <div className="w-full min-h-[90vh] flex justify-center items-center overflow-hidden">
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="w-full lg:w-[40%] flex flex-col justify-center items-center gap-5">
        <div className="flex justify-center items-center text-[40px]">
          <div className="w-[75px] h-[75px]">
            <img src="src/assets/Logo.png" alt="" />
          </div>
          <h1 className="text-[#4A90E2] font-bold">TaskFlow</h1>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 mt-3">
          <h3 className="text-[#2C3E50] font-bold text-2xl">ورود به حساب</h3>
          <p className="text-[#6B7280] text-[14px]">برای ادامه وارد حساب کاربری خود شوید</p>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-2">
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
            <div className="w-full flex flex-row-reverse justify-between items-center">
              <label className="text-[#6B7280]" htmlFor="">رمز عبور</label>
              <p className="text-[#4A90E2] text-[14px] cursor-pointer">رمز عبور را فراموش کرده‌اید؟</p>
            </div>
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
        </div>
        <button type="submit" className="w-1/2 h-8 bg-[#4A90E2] text-[#FFFFFF] font-bold rounded flex items-center justify-center cursor-pointer">
          ورود
        </button>
        <p onClick={handleSignUpNavigate} className="text-[#4A90E2] cursor-pointer text-[15px] mt-2">حساب کاربری ندارید؟</p>
      </form>
      {toast.message && (
        <div dir="rtl"
          className={`fixed top-10 left-1/2 -translate-x-1/2 transform text-white px-4 lg:px-6 py-3 rounded-2xl shadow-lg text-lg transition-all duration-300 ${toast.type === "success" ? "bg-green-500/80" : "bg-red-500/80"}`}>
          {toast.message}
        </div>
      )}
    </div>
  )
}

export default Login;
