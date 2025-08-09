import React, { useContext, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
// import AuthContext, { authDataContext } from "../Context/AuthContext.jsx";
import axios from "axios";
import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from "../Context/UserContext";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const { userData, setUserData } = useContext(userDataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      let result = await axios.post(
        serverUrl + "/api/auth/login/",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setUserData(result.data); // ✅ only runs after result is ready
      navigate("/"); // ✅ navigate after login success

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div
        className="w-[50px] h-[50px] bg-red-600 cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center"
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong className="w-[30px] h-[25px] text-[white]" />
      </div>
      <form
        action=""
        className="max-w-[900px] w-[90%] h-[600px] flex  justify-center flex-col md: items-start gap-[10px]"
        onSubmit={handleLogin}
      >
        <h1 className="text-2xl md:text-4xl text-black">
          Welcom to Gaur Booking
        </h1>
        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] ">
          <label htmlFor="email" className="text-[20px]">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
        <button className="px-[50px] py-[10px] bg-[red] text-white rounded-lg text-[18px] md:px-[100px]">
          Login
        </button>
        <p className="text-[18px]">
          Create New Account
          <span
            className="text-[19px] text-red-600 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            {" "}
            SignUp
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
