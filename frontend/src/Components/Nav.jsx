import React, { useContext, useState } from "react";
import logo from "../assets/my-logo.png";
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
import { useEffect } from "react";

function Nav() {
  const [showPopUp, setShowPopUp] = useState(false);
  const { userData, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  let { serverUrl } = useContext(authDataContext);
  let [cate, setCate] = useState();
  let {
    listingData,
    setListingData,
    newlistData,
    setNewListData,
    searchData,
    setSearchData,
    handleSearch,
    handleViewCard
  } = useContext(listingDataContext);
  let [input, setInput] = useState("");

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

    const handleClick = (id) => {
    console.log("Card clicked, ID:", id); // Add this for debugging
    if (userData) {
      if (!id) {
        console.error("No ID provided for listing");
        return;
      }
      handleViewCard(id);
    } else {
      navigate("/login");
    }
  };



  useEffect(() => {
    handleSearch(input);
  }, [input]);

  return (
    <div className="fixed top-0 bg-white z-[20] shadow-md">
      {/* Top Navbar */}
      <div className="w-[100vw] min-h-[80px] border-b-[1px] border-gray-200 px-[20px] md:px-[40px] flex items-center justify-between">
        <div className="flex-shrink-0">
          <img src={logo} alt="logo" className="w-[60px] md:w-[80px] rounded-lg shadow-sm" />
        </div>
        
        {/* ✅ Centered Search Box for Desktop */}
        <div className="flex-1 max-w-[500px] mx-auto relative hidden md:block">
          <input
            type="text"
            className="w-full px-[30px] py-[12px] border-[2px] border-gray-300 outline-none rounded-full text-[16px] shadow-sm focus:border-red-400 focus:shadow-lg transition-all duration-200 placeholder-gray-500"
            placeholder="🏠 Search anywhere • Any location • Any city"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button className="absolute p-[12px] rounded-full bg-gradient-to-r from-red-500 to-red-600 right-[4px] top-[4px] hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl">
            <FiSearch className="w-[16px] h-[16px] text-white" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-[10px] relative flex-shrink-0">
          <span
            className="text-[16px] cursor-pointer rounded-full hover:bg-gray-100 px-[16px] py-[8px] hidden md:block font-medium text-gray-700 transition-all duration-200"
            onClick={() => navigate("/listingpage1")}
          >
            List your home
          </span>
          <button
            className="px-[16px] py-[10px] flex items-center justify-center gap-[8px] border-[1px] border-gray-300 rounded-full hover:shadow-lg transition-all duration-200 bg-white"
            onClick={() => {
              setShowPopUp((prev) => !prev);
            }}
          >
            <span>
              <RxHamburgerMenu className="w-[18px] h-[18px] text-gray-600" />
            </span>
            {userData == null && (
              <span>
                <CgProfile className="w-[22px] h-[22px] text-gray-600" />
              </span>
            )}

            {userData != null && (
              <span className="w-[32px] h-[32px] bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center font-semibold text-sm shadow-md">
                {userData?.name.slice(0, 1)}
              </span>
            )}
          </button>
          {showPopUp && (
            <div className="w-[240px] absolute top-[110%] right-0 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 transition-all duration-200 overflow-hidden">
              <ul className="flex flex-col text-[15px] text-gray-700 font-medium">
                {!userData && (
                  <li
                    className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b border-gray-100"
                    onClick={() => {
                      navigate("/login");
                      setShowPopUp(false);
                    }}
                  >
                    <span className="flex items-center gap-3">
                      <span>🔐</span>
                      Login
                    </span>
                  </li>
                )}
                {userData && (
                  <li
                    className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b border-gray-100"
                    onClick={() => {
                      handleLogOut();
                      setShowPopUp(false);
                    }}
                  >
                    <span className="flex items-center gap-3">
                      <span>🚪</span>
                      Logout
                    </span>
                  </li>
                )}
                <li
                  className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b border-gray-100"
                  onClick={() => {
                    navigate("/listingpage1");
                    setShowPopUp(false);
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span>🏠</span>
                    List your Home
                  </span>
                </li>
                <li
                  className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b border-gray-100"
                  onClick={() => {
                    navigate("/mylisting");
                    setShowPopUp(false);
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span>📋</span>
                    My Listing
                  </span>
                </li>
                <li
                  className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  onClick={() => {
                    navigate("/mybooking");
                    setShowPopUp(false);
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span>🗓️</span>
                    My Booking
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* ✅ Enhanced Search Results Dropdown - Centered */}
        {searchData?.length > 0 && (
          <div className="w-full max-w-[800px] absolute top-full left-1/2 transform -translate-x-1/2 z-40 mt-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden max-h-[400px] overflow-y-auto">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700">Search Results</h3>
              </div>
              {searchData.map((search, index) => (
                <div 
                  key={search._id} 
                  className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150" 
                  onClick={() => handleClick(search._id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div>
                      <div className="font-medium text-gray-800">{search.title}</div>
                      <div className="text-sm text-gray-500">📍 {search.landMark}, {search.city}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ✅ Enhanced Mobile Search Bar */}
      <div className="w-full h-[70px] flex items-center px-[20px] md:hidden border-b border-gray-100">
        <div className="w-full relative">
          <input
            type="text"
            className="w-full px-[30px] py-[12px] border-[2px] border-gray-300 outline-none rounded-full text-[16px] shadow-sm focus:border-red-400 focus:shadow-lg transition-all duration-200 placeholder-gray-500"
            placeholder="🏠 Search anywhere..."
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button className="absolute p-[12px] rounded-full bg-gradient-to-r from-red-500 to-red-600 right-[4px] top-[4px] hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg">
            <FiSearch className="w-[16px] h-[16px] text-white" />
          </button>
        </div>
      </div>

      {/* ✅ Enhanced Category Icons Bar */}
      <div className="w-full h-[90px] bg-white flex items-center md:justify-center justify-start overflow-x-auto cursor-pointer gap-[25px] px-[20px] md:px-0 border-b border-gray-100">
        <div
          className="flex items-center justify-center flex-col hover:border-b-[3px] hover:border-red-400 text-[13px] min-w-[70px] pb-2 transition-all duration-200 group"
          onClick={() => {
            handleCategory("Trending");
            setCate("");
          }}
        >
          <MdWhatshot className="w-[28px] h-[28px] text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
          <h3 className="mt-1 font-medium text-gray-700 group-hover:text-red-500">Trending</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b-[3px] hover:border-red-400 text-[13px] min-w-[70px] pb-2 transition-all duration-200 group ${
           cate == "Villa" ? "border-b-[3px] border-red-500" : ""
         }`}
          onClick={() => handleCategory("Villa")}
        >
          <GiFamilyHouse className="w-[28px] h-[28px] text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
          <h3 className="mt-1 font-medium text-gray-700 group-hover:text-red-500">Villa</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b-[3px] hover:border-red-400 text-[13px] min-w-[70px] pb-2 transition-all duration-200 group ${
           cate == "FarmHouse" ? "border-b-[3px] border-red-500" : ""
         }`}
          onClick={() => handleCategory("FarmHouse")}
        >
          <BiSolidBuildingHouse className="w-[28px] h-[28px] text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
          <h3 className="mt-1 font-medium text-gray-700 group-hover:text-red-500">Farm House</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b-[3px] hover:border-red-400 text-[13px] min-w-[70px] pb-2 transition-all duration-200 group ${
           cate == "PoolHouse" ? "border-b-[3px] border-red-500" : ""
         }`}
          onClick={() => handleCategory("PoolHouse")}
        >
          <MdBedroomParent className="w-[28px] h-[28px] text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
          <h3 className="mt-1 font-medium text-gray-700 group-hover:text-red-500">Pool House</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b-[3px] hover:border-red-400 text-[13px] min-w-[70px] pb-2 transition-all duration-200 group ${
           cate == "Rooms" ? "border-b-[3px] border-red-500" : ""
         }`}
          onClick={() => handleCategory("Rooms")}
        >
          <MdBedroomParent className="w-[28px] h-[28px] text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
          <h3 className="mt-1 font-medium text-gray-700 group-hover:text-red-500">Rooms</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b-[3px] hover:border-red-400 text-[13px] min-w-[70px] pb-2 transition-all duration-200 group ${
           cate == "Flat" ? "border-b-[3px] border-red-500" : ""
         }`}
          onClick={() => handleCategory("Flat")}
        >
          <MdOutlineHouseboat className="w-[28px] h-[28px] text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
          <h3 className="mt-1 font-medium text-gray-700 group-hover:text-red-500">Flat</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b-[3px] hover:border-red-400 text-[13px] min-w-[70px] pb-2 transition-all duration-200 group ${
           cate == "PG" ? "border-b-[3px] border-red-500" : ""
         }`}
          onClick={() => handleCategory("PG")}
        >
          <LuWarehouse className="w-[28px] h-[28px] text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
          <h3 className="mt-1 font-medium text-gray-700 group-hover:text-red-500">PG</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b-[3px] hover:border-red-400 text-[13px] min-w-[70px] pb-2 transition-all duration-200 group ${
           cate == "Cabins" ? "border-b-[3px] border-red-500" : ""
         }`}
          onClick={() => handleCategory("Cabins")}
        >
          <HiMiniBuildingOffice className="w-[28px] h-[28px] text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
          <h3 className="mt-1 font-medium text-gray-700 group-hover:text-red-500">Cabins</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b-[3px] hover:border-red-400 text-[13px] min-w-[70px] pb-2 transition-all duration-200 group ${
           cate == "Shop" ? "border-b-[3px] border-red-500" : ""
         }`}
          onClick={() => handleCategory("Shop")}
        >
          <GiVikingLonghouse className="w-[28px] h-[28px] text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
          <h3 className="mt-1 font-medium text-gray-700 group-hover:text-red-500">Shop</h3>
        </div>
      </div>
    </div>
  );
}

export default Nav;