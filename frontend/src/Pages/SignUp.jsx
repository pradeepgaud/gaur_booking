import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";


function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
            <div
        className="w-[50px] h-[50px] bg-red-600 cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center"
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong className="w-[30px] h-[25px] text-[white]" />
      </div>
      {/* <div className="w-[50px] h-[50px] bg-[red]"><FaArrowLeftLong /></div> */}
      <form
        action=""
        className="max-w-[900px] w-[90%] h-[600px] flex  justify-center flex-col md: items-start gap-[10px]"
      >
        <h1 className="text-2xl md:text-4xl text-black">
          Welcom to Gaur Booking
        </h1>
        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="name" className="text-[20px]">
            UserName
          </label>
          <input
            type="text"
            id="name"
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
          />
        </div>

        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] ">
          <label htmlFor="email" className="text-[20px]">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
          />
        </div>

        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] relative">
          <label htmlFor="password" className="text-[20px]">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
          />
          {!showPassword && (
            <IoMdEye
              className="w-[22px] h-[22px] absolute right-[12%] bottom-[10%] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          )}
          {showPassword && (
            <IoMdEyeOff
              className="w-[22px] h-[22px] absolute right-[12%] bottom-[10%] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          )}
        </div>
        <button className="px-[50px] py-[10px] bg-[red] text-white rounded-lg text-[18px] md:px-[100px] mt-[20px]">
          SignUp
        </button>
        <p className="text-[18px]">
          Already have a account?
          <span
            className="text-[19px] text-[red] cursor-pointer"
            onClick={() => navigate("/login")}
          >
            {" "}
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
