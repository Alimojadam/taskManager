import { useState, type JSX } from "react";
import Modal from "../../Modal/Modal";
import { useUser } from "../Context/userContext/UseUser";
import EditProfile from "../../Components/EditProfile/EditProfile";
import ChangePassword from "../../Components/ChangePassword/ChangePassword";

interface Toast {
  message: string;
  type: "success" | "error" | "";
}

const Settings = () => {
  const { user } = useUser();

  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<Toast>({
    message: "",
    type: "",
  });
  const [isActiveEmail, setIsActiveEmail] = useState<boolean>(false);
  const [isActiveApp, setIsActiveApp] = useState<boolean>(false);

  const openModal = (content: JSX.Element):void => {
    setModalContent(content);
    setIsOpen(true);
  };

  const showToast = (message: string, type: "success" | "error"): void => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 2000);
  };

  const languages: string[] = ["فارسی", "English", "العربية", "Türkçe"];
  const [selectedLang, setSelectedLang] = useState<string>("فارسی");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleSelect = (lang: string):void => {
    setSelectedLang(lang);
    setIsDropdownOpen(false);
    localStorage.setItem("selectedLanguage", lang);
  };

  if (!user) return null;

  return (
    <div className="w-full px-5 py-10 flex flex-col gap-10">
      <div className="w-full flex justify-end items-start">
        <h4 className="font-bold text-[30px] text-[#2C3E50]">تنظیمات</h4>
      </div>

      <div className="w-full px-10 flex flex-col justify-start items-end gap-10">
        <div className="flex flex-col justify-start items-end gap-1">
          <p className="text-[20px] text-[#2C3E50]">اطلاعات کاربری</p>
          <p className="text-[16px] text-[#6B7280]">
            !..مشاهده و مدیریت اطلاعات پروفایل
          </p>
        </div>

        <div className="w-full flex flex-row-reverse justify-start items-start gap-5">
          <div className="w-[80px] h-[80px] rounded-full">
            <img
              src={user.profilIMG || "/assets/user.png"}
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          <div className="h-[80px] flex flex-col justify-between items-end">
            <div className="flex flex-col justify-start items-end">
              <p className="text-[#2C3E50] text-[17px]">{user.name}</p>
              <p className="text-[#6B7280] text-[15px]">{user.email}</p>
            </div>

            <div
              className="flex justify-end items-start cursor-pointer"
              onClick={() =>
                openModal(
                  <EditProfile setIsOpen={setIsOpen} showToast={showToast} />
                )
              }
            >
              <p className="text-[#4A90E2] text-[15px]">ویرایش پروفایل</p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col justify-start items-end gap-7">
              <div className="flex flex-col justify-start items-end gap-1">
                <p className="text-[18px] text-[#2C3E50]">تنظیمات اعلان ها</p>
                <p className="text-[15px] text-[#6B7280]">
                  !..مدیریت نحوه دریافت اعلان ها
                </p>
              </div>
              <div className="w-full lg:w-[40%] flex flex-col justify-start items-start gap-5">
                <div className="w-full flex flex flex-row-reverse justify-between items-center">
                  <p className="text-[#2C3E50] text-[18px]">اعلان های ایمیل</p>
                  <button
                    onClick={() => setIsActiveEmail((prev) => !prev)}
                    className={`relative w-[60px] h-[30px] p-1 rounded-full transition-colors duration-300 ${
                      isActiveEmail ? "bg-[#4A90E2]" : "bg-[#B0B8C1]"
                    }`}
                  >
                    <span
                      className={`absolute w-[25px] h-[25px] rounded-full bg-[#FFFFFF] top-1/2 left-[2px] -translate-y-1/2 transition-transform duration-300 ${
                        isActiveEmail ? "translate-x-[30px]" : "translate-x-0"
                      }`}
                    ></span>
                  </button>

                </div>
                <div className="w-full flex flex flex-row-reverse justify-between items-center">
                  <p className="text-[#2C3E50] text-[18px]">اعلان های درون برنامه‌ای</p>
                  <button
                    onClick={() => setIsActiveApp((prev) => !prev)}
                    className={`relative w-[60px] h-[30px] p-1 rounded-full transition-colors duration-300 ${
                      isActiveApp ? "bg-[#4A90E2]" : "bg-[#B0B8C1]"
                    }`}
                  >
                    <span
                      className={`absolute w-[25px] h-[25px] rounded-full bg-[#FFFFFF] top-1/2 left-[2px] -translate-y-1/2 transition-transform duration-300 ${
                        isActiveApp ? "translate-x-[30px]" : "translate-x-0"
                      }`}
                    ></span>
                  </button>
                </div>
              </div>
        </div>

        <div className="w-full flex flex-col justify-start items-end gap-7">
          <div className="flex flex-col justify-start items-end gap-1">
            <p className="text-[18px] text-[#2C3E50]">زبان</p>
            <p className="text-[15px] text-[#6B7280]">
              !..زبان رابط کاربری را انتخاب کنید
            </p>
          </div>
          <div className="relative w-[170px] h-[35px] flex flex-col justify-start items-end border border-[#6B7280] rounded-md cursor-pointer">
            <div
              className="w-full h-full flex justify-between items-center px-2"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <p className="text-[#2C3E50]">{selectedLang}</p>
              <i
                className={`bi bi-chevron-down text-[#2C3E50] transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              ></i>
            </div>

            {isDropdownOpen && (
              <div className="absolute top-[40px] w-full bg-white border border-[#B0B8C1] rounded-md shadow-md flex flex-col justify-start items-end z-50">
                {languages.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => handleSelect(item)}
                    className="w-full text-[#2C3E50] hover:bg-[#F0F0F0] px-3 py-1 text-right"
                  >
                    {item}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col justify-start items-end gap-4">
          <div className="flex flex-col justify-start items-end gap-1">
            <p className="text-[18px] text-[#2C3E50]">مدیریت رمز عبور</p>
            <p className="text-[15px] text-[#6B7280]">
              !..تغییر رمز عبور خود
            </p>
          </div>
          <div onClick={() =>
                openModal(
                  <ChangePassword setIsOpen={setIsOpen} showToast={showToast} />
                )
              } className="px-5 py-[5px] flex justify-center items-center cursor-pointer border border-[#6B7280] text-[#2C3E50] rounded-md transition-all ease-in-out duration-300 hover:shadow-[#6B7280] hover:shadow-md">
            تغییر رمز عبور
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {modalContent}
      </Modal>

      {toast.message && (
        <div
          dir="rtl"
          className={`fixed top-10 left-1/2 -translate-x-1/2 transform z-[9999] text-white px-4 lg:px-6 py-3 rounded-2xl shadow-lg text-lg transition-all duration-300 ${
            toast.type === "success" ? "bg-green-500/80" : "bg-red-500/80"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Settings;
