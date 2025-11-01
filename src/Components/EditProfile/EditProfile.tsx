import { useState } from "react";
import { useUser } from "../../Pages/Context/userContext/UseUser";
import type { User } from "../../info/userInfo";

interface EditProfileProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showToast: (message: string, type: "success" | "error") => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ setIsOpen, showToast }) => {
  const { user, setUser } = useUser();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profilIMG, setProfilIMG] = useState(user?.profilIMG || "");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setProfilIMG(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast("نام نمی‌تواند خالی باشد", "error");
      return;
    }

    if (!email.trim()) {
      showToast("ایمیل نمی‌تواند خالی باشد", "error");
      return;
    }

    if (!user) {
      showToast("کاربر یافت نشد", "error");
      return;
    }

    const updatedUser: User = {
      ...user,
      name,
      email,
      profilIMG,
    };

    // ذخیره توی context و localStorage با همان کلید currentUser
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    setIsOpen(false);
    showToast("اطلاعات با موفقیت ویرایش شد", "success");
  };

  return (
    <div className="w-full flex flex-col justify-start items-end gap-4" dir="rtl">
      <p className="w-full text-center text-[18px] text-[#2C3E50]">
        ویرایش اطلاعات کاربر
      </p>

      <form onSubmit={handleSave} className="w-full flex flex-col justify-start items-start gap-4">
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <label className="text-[16px] text-[#2C3E50]">نام</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-[450px] outline-none bg-transparent border border-[#B0B8C1] rounded-md px-2 py-1 text-[14px] text-[#2C3E50]"
          />
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-2">
          <label className="text-[16px] text-[#2C3E50]">ایمیل</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-[450px] outline-none bg-transparent border border-[#B0B8C1] rounded-md px-2 py-1 text-[14px] text-[#2C3E50]"
          />
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-2">
          <label className="text-[16px] text-[#2C3E50]">عکس پروفایل</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="text-[14px] text-[#2C3E50]" />
          {profilIMG && (
            <img
              src={profilIMG}
              alt="Profile Preview"
              className="w-[100px] h-[100px] object-cover rounded-full mt-2 border border-[#B0B8C1]"
            />
          )}
        </div>

        <div className="flex justify-start items-end gap-4 mt-5">
          <button
            type="submit"
            className="px-8 py-1 border border-[#6B7280] rounded-md text-[#2C3E50] transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-[#B0B8C1]"
          >
            ذخیره تغییرات
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

export default EditProfile;
