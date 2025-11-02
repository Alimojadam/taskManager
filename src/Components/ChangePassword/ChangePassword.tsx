import { useState } from "react";
import { useUser } from "../../Pages/Context/userContext/UseUser";
import type { User } from "../../info/userInfo";

interface ChangePasswordProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showToast: (message: string, type: "success" | "error") => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ setIsOpen, showToast }) => {
  const { user, setUser } = useUser();

  const [currentPass, setCurrentPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [showCurrent, setShowCurrent] = useState<boolean>(false);
  const [showNew, setShowNew] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent):void => {
    e.preventDefault();

    if (!currentPass || !newPass || !confirmPass) {
      showToast("تمام فیلدها باید پر شوند", "error");
      return;
    }

    if (newPass.length < 8) {
      showToast("رمز عبور جدید باید حداقل ۸ کاراکتر باشد", "error");
      return;
    }

    if (newPass !== confirmPass) {
      showToast("رمز عبور جدید با تکرار آن مطابقت ندارد", "error");
      return;
    }

    if (!user) return;

    if (user.pass !== currentPass) {
      showToast("رمز عبور فعلی اشتباه است", "error");
      return;
    }

    const updatedUser: User = {
      ...user,
      pass: newPass,
    };

    setUser(updatedUser);
    localStorage.setItem("userData", JSON.stringify(updatedUser));

    showToast("رمز عبور با موفقیت تغییر یافت", "success");
    setIsOpen(false);
  };

  const renderInput = (
    label: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
  ) => (
    <div className="w-full flex flex-col justify-start items-start gap-2 relative">
    <label className="text-[#2C3E50] text-[16px]">{label}</label>
    <div className="relative w-full">
        <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-2 py-1 bg-[#FFFFFF] outline-none border border-[#6B7280] rounded-md text-[#2C3E50]"
        />
        <i
        className={`bi ${show ? "bi-eye-slash" : "bi-eye"} absolute top-0 left-2 text-[17px] text-[#4A90E2] h-full flex items-center cursor-pointer`}
        onClick={() => setShow((prev) => !prev)}
        ></i>
    </div>
</div>


  );

  return (
    <div className="w-full">
      <form
        dir="rtl"
        className="w-full flex flex-col justify-start items-start gap-5"
        onSubmit={handleSubmit}
      >
        {renderInput("رمز عبور فعلی", currentPass, setCurrentPass, showCurrent, setShowCurrent)}
        <div className="w-full border-b border-[#6B7280]"></div>
        {renderInput("رمز عبور جدید", newPass, setNewPass, showNew, setShowNew)}
        {renderInput("تکرار رمز عبور جدید", confirmPass, setConfirmPass, showConfirm, setShowConfirm)}

        <div className="flex justify-start items-start gap-2">
          <button
            type="submit"
            className="px-8 py-1 border border-[#6B7280] rounded-md text-[#2C3E50] transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-[#B0B8C1]"
          >
            ثبت
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-8 py-1 border border-[#6B7280] rounded-md text-[#2C3E50] transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-[#B0B8C1]"
          >
            لغو
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
