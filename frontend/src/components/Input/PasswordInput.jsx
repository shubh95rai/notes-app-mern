import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";

export default function PasswordInput({ value, placeholder, onChange }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 mb-3 rounded-lg">
      <input
        type={isPasswordVisible ? "text" : "password"}
        placeholder={placeholder || "Password"}
        value={value}
        onChange={onChange}
        className="w-full text-sm bg-transparent outline-none py-3 mr-3"
      />

      {isPasswordVisible ? (
        <IoEyeSharp
          size={22}
          className="text-my-primary cursor-pointer"
          onClick={togglePasswordVisibility}
        />
      ) : (
        <IoEyeOffSharp
          size={22}
          className="text-gray-400 cursor-pointer"
          onClick={togglePasswordVisibility}
        />
      )}
    </div>
  );
}
