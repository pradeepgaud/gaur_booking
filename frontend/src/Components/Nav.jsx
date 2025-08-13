import React, { useContext, useState } from "react";
import logo from "../assets/logo-02.jpg";
import { FiSearch } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import {
  MdWhatshot,
  MdOutlinePool,
  MdBedroomParent,
  MdOutlineHouseboat,
} from "react-icons/md";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { GiFamilyHouse, GiVikingLonghouse } from "react-icons/gi";
import { LuWarehouse } from "react-icons/lu";
import { HiMiniBuildingOffice } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "./../Context/AuthContext";
import { userDataContext } from "../Context/UserContext";
import { listingDataContext } from "./../Context/ListingContext";

function Nav() {
  const [showPopUp, setShowPopUp] = useState(false);
  const { userData, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  let { serverUrl } = useContext(authDataContext);
  let [cate, setCate] = useState();
  let { listingData, setListingData, newlistData, setNewListData } =
    useContext(listingDataContext);

  const handleLogOut = async () => {
    try {
      let result = await axios.post(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      setUserData();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategory = (category) => {
    setCate(category);
    if (category == "Trending") {
      setNewListData(listingData);
    } else {
      setNewListData(listingData.filter((list) => list.category == category));
    }
  };

  return (
    <div className="fixed top-0 bg-white">
      {/* Top Navbar */}
      <div className="w-[100vw] min-h-[80px] border-b-[1px] border-[#dcdcdc] px-[40px] flex items-center justify-between md:px-[40px] ">
        <div>
          <img src={logo} alt="logo" className="w-[70px] md:w-[90px]" />
        </div>
        <div className="w-[35%] relative hidden md:block">
          <input
            type="text"
            className="w-[100%] px-[30px] py-[8px] border-[2px] border-[#bababa] outline-none overflow-auto rounded-[30px] text-[17px]"
            placeholder="Any Where | Any Location | Any City"
          />
          <button className="absolute p-[10px] rounded-[50px] bg-[red] right-[3%] top-[3px]">
            <FiSearch className="w-[18px] h-[18px] text-white" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-[10px] relative ">
          <span
            className="text-[18px] corsor-pointer rounded-[50px] hover:bg-[#ded9d9] px-[8px] py-[5px] hidden md:block"
            onClick={() => navigate("/listingpage1")}
          >
            List your home
          </span>
          <button
            className="px-[20px] py-[10px] flex items-center justify-center gap-[5px] border-[1px] border-[#8d8c8c] rounded-[50px] hover:shadow-lg"
            onClick={() => {
              setShowPopUp((prev) => !prev);
            }}
          >
            <span>
              <RxHamburgerMenu className="w-[20px] h-[20px]" />
            </span>
            {userData == null && (
              <span>
                <CgProfile className="w-[23px] h-[23px]" />
              </span>
            )}

            {userData != null && (
              <span className="w-[30px] h-[30px] bg-[#080808] text-[white] rounded-full flex items-center justify-center">
                {userData?.name.slice(0, 1)}
              </span>
            )}
          </button>
          {showPopUp && (
            <div className="w-[220px] absolute top-[110%] right-4 md:right-6 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-200">
              <ul className="flex flex-col text-[15px] text-gray-700 font-medium">
                {!userData && (
                  <li
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition"
                    onClick={() => {
                      navigate("/login");
                      setShowPopUp(false);
                    }}
                  >
                    Login
                  </li>
                )}
                {userData && (
                  <li
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition "
                    onClick={() => {
                      handleLogOut();
                      setShowPopUp(false);
                    }}
                  >
                    Logout
                  </li>
                )}
                <hr className="my-1 border-gray-200" />
                <li
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition "
                  onClick={() => {
                    navigate("/listingpage1");
                    setShowPopUp(false);
                  }}
                >
                  List your Home
                </li>
                <li
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition"
                  onClick={() => {
                    navigate("/mylisting");
                    setShowPopUp(false);
                  }}
                >
                  My Listing
                </li>
                <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition">
                  Check Booking
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="w-[100%] h-[60px] flex items-center px-[20px] md:hidden">
        <div className="w-full relative block">
          <input
            type="text"
            className="w-full px-[30px] py-[8px] border-[2px] border-[#bababa] outline-none overflow-auto rounded-[30px] text-[17px]"
            placeholder="Any Where | Any Location | Any City"
          />
          <button className="absolute p-[10px] rounded-[50px] bg-[red] right-[3%] top-[3px]">
            <FiSearch className="w-[18px] h-[18px] text-white" />
          </button>
        </div>
      </div>

      {/* Scrollable Icon Bar */}
      <div className="w-full h-[85px] bg-white flex items-center md:justify-center justify-start overflow-x-auto cursor-pointer gap-[20px] px-[15px] md:px-0">
        <div
          className="flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] min-w-[60px]"
          onClick={() => {
            handleCategory("Trending");
            setCate("");
          }}
        >
          <MdWhatshot className="w-[30px] h-[30px] text-black" />
          <h3>Trending</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px]
         border-[#a6a5a5] text-[13px] min-w-[60px] ${
           cate == "Villa" ? "border-b-[1px] border-[#a6a5a5]" : ""
         }`}
          onClick={() => handleCategory("Villa")}
        >
          <GiFamilyHouse className="w-[30px] h-[30px] text-black" />
          <h3>Villa</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px]
         border-[#a6a5a5] text-[13px] min-w-[60px] ${
           cate == "FarmHouse" ? "border-b-[1px] border-[#a6a5a5]" : ""
         }`}
          onClick={() => handleCategory("FarmHouse")}
        >
          <BiSolidBuildingHouse className="w-[30px] h-[30px] text-black " />
          <h3>Farm House</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px]
         border-[#a6a5a5] text-[13px] min-w-[60px] ${
           cate == "PoolHouse" ? "border-b-[1px] border-[#a6a5a5]" : ""
         }`}
          onClick={() => handleCategory("PoolHouse")}
        >
          <MdBedroomParent className="w-[30px] h-[30px] text-black" />
          <h3>Pool House</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px]
         border-[#a6a5a5] text-[13px] min-w-[60px] ${
           cate == "Rooms" ? "border-b-[1px] border-[#a6a5a5]" : ""
         }`}
          onClick={() => handleCategory("Rooms")}
        >
          <MdBedroomParent className="w-[30px] h-[30px] text-black" />
          <h3>Rooms</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px]
         border-[#a6a5a5] text-[13px] min-w-[60px] ${
           cate == "Flat" ? "border-b-[1px] border-[#a6a5a5]" : ""
         }`}
          onClick={() => handleCategory("Flat")}
        >
          <MdOutlineHouseboat className="w-[30px] h-[30px] text-black" />
          <h3>Flat</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px]
         border-[#a6a5a5] text-[13px] min-w-[60px] ${
           cate == "PG" ? "border-b-[1px] border-[#a6a5a5]" : ""
         }`}
          onClick={() => handleCategory("PG")}
        >
          <LuWarehouse className="w-[30px] h-[30px] text-black" />
          <h3>PG</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px]
         border-[#a6a5a5] text-[13px] min-w-[60px] ${
           cate == "Cabins" ? "border-b-[1px] border-[#a6a5a5]" : ""
         }`}
          onClick={() => handleCategory("Cabins")}
        >
          <HiMiniBuildingOffice className="w-[30px] h-[30px] text-black" />
          <h3>Cabins</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px]
         border-[#a6a5a5] text-[13px] min-w-[60px] ${
           cate == "Shop" ? "border-b-[1px] border-[#a6a5a5]" : ""
         }`}
          onClick={() => handleCategory("Shop")}
        >
          <GiVikingLonghouse className="w-[30px] h-[30px] text-black" />
          <h3>Shop</h3>
        </div>
      </div>
    </div>
  );
}

export default Nav;
