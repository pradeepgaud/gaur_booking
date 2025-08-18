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
    console.log("Card clicked, ID:", id);
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
    <>
      {/* Fixed Navbar Container - No Layout Shift */}
      <nav 
        className="fixed top-0 left-0 right-0 bg-white z-[1000] shadow-md"
        style={{
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      >
        {/* Top Navbar */}
        <div className="w-full h-[70px] sm:h-[80px] border-b border-gray-200 px-4 sm:px-6 md:px-8 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src={logo} 
              alt="logo" 
              className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] rounded-lg shadow-sm object-contain" 
            />
          </div>
          
          {/* Desktop Search Box */}
          <div className="flex-1 max-w-[400px] lg:max-w-[500px] mx-4 relative hidden md:block">
            <input
              type="text"
              className="w-full px-6 py-3 border-2 border-gray-300 outline-none rounded-full text-sm lg:text-base shadow-sm focus:border-red-400 focus:shadow-lg transition-all duration-200 placeholder-gray-500"
              placeholder="🏠 Search anywhere • Any location • Any city"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <button className="absolute p-2.5 lg:p-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 right-1 top-1 hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              <FiSearch className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </button>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-2 sm:gap-3 relative flex-shrink-0">
            <span
              className="text-sm lg:text-base cursor-pointer rounded-full hover:bg-gray-100 px-3 lg:px-4 py-2 hidden lg:block font-medium text-gray-700 transition-all duration-200 whitespace-nowrap"
              onClick={() => navigate("/listingpage1")}
            >
              List your home
            </span>
            <button
              className="px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-center gap-2 border border-gray-300 rounded-full hover:shadow-lg transition-all duration-200 bg-white min-w-[50px]"
              onClick={() => setShowPopUp((prev) => !prev)}
            >
              <span>
                <RxHamburgerMenu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </span>
              {userData == null && (
                <span className="hidden sm:block">
                  <CgProfile className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </span>
              )}
              {userData != null && (
                <span className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm shadow-md">
                  {userData?.name.slice(0, 1)}
                </span>
              )}
            </button>
            
            {/* Popup Menu */}
            {showPopUp && (
              <div className="absolute top-full right-0 mt-2 w-[220px] sm:w-[240px] bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-xl z-[1001] overflow-hidden">
                <ul className="flex flex-col text-sm text-gray-700 font-medium">
                  {!userData && (
                    <li
                      className="px-4 py-3 sm:px-6 sm:py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b border-gray-100"
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
                      className="px-4 py-3 sm:px-6 sm:py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b border-gray-100"
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
                    className="px-4 py-3 sm:px-6 sm:py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b border-gray-100"
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
                    className="px-4 py-3 sm:px-6 sm:py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b border-gray-100"
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
                    className="px-4 py-3 sm:px-6 sm:py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
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
        </div>

        {/* Mobile Search Bar */}
        <div className="w-full h-[60px] sm:h-[70px] flex items-center px-4 sm:px-6 md:hidden border-b border-gray-100 bg-white">
          <div className="w-full relative">
            <input
              type="text"
              className="w-full px-6 py-3 border-2 border-gray-300 outline-none rounded-full text-sm shadow-sm focus:border-red-400 focus:shadow-lg transition-all duration-200 placeholder-gray-500"
              placeholder="🏠 Search anywhere..."
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <button className="absolute p-2.5 rounded-full bg-gradient-to-r from-red-500 to-red-600 right-1 top-1 hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg">
              <FiSearch className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Category Icons Bar - NO SCROLLBAR */}
        <div className="w-full h-[80px] sm:h-[90px] bg-white border-b border-gray-100 relative overflow-hidden">
          <div 
            className="flex items-center h-full px-4 sm:px-6 md:px-8 gap-6 md:gap-8 md:justify-center overflow-x-auto"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {/* Trending */}
            <div
              className="flex items-center justify-center flex-col hover:border-b-2 sm:hover:border-b-3 hover:border-red-400 text-xs sm:text-sm min-w-[70px] pb-2 transition-all duration-200 group flex-shrink-0 cursor-pointer"
              onClick={() => {
                handleCategory("Trending");
                setCate("");
              }}
            >
              <MdWhatshot className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
              <h3 className="mt-1 font-medium text-gray-700 group-hover:text-red-500 text-center">Trending</h3>
            </div>

            {/* Villa */}
            <div
              className={`flex items-center justify-center flex-col hover:border-b-2 sm:hover:border-b-3 hover:border-red-400 text-xs sm:text-sm min-w-[70px] pb-2 transition-all duration-200 group flex-shrink-0 cursor-pointer ${
               cate == "Villa" ? "border-b-2 sm:border-b-3 border-red-500" : ""
             }`}
              onClick={() => handleCategory("Villa")}
            >
              <GiFamilyHouse className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
              <h3 className="mt-1 font-medium text-gray-700 group-hover:text-red-500 text-center">Villa</h3>
            </div>

            {/* Farm House */}
            <div
              className={`flex items-center justify-center flex-col hover:border-b-2 sm:hover:border-b-3 hover:border-red-400 text-xs sm:text-sm min-w-[85px] pb-2 transition-all duration-200 group flex-shrink-0 cursor-pointer ${
               cate == "FarmHouse" ? "border-b-2 sm:border-b-3 border-red-500" : ""
             }`}
              onClick={() => handleCategory("FarmHouse")}
            >
              <BiSolidBuildingHouse className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
              <h3 className="mt-1 font-medium text-gray-700 group-hover:text-red-500 text-center whitespace-nowrap">Farm House</h3>
            </div>

            {/* Pool House */}
            <div
              className={`flex items-center justify-center flex-col hover:border-b-2 sm:hover:border-b-3 hover:border-red-400 text-xs sm:text-sm min-w-[85px] pb-2 transition-all duration-200 group flex-shrink-0 cursor-pointer ${
               cate == "PoolHouse" ? "border-b-2 sm:border-b-3 border-red-500" : ""
             }`}
              onClick={() => handleCategory("PoolHouse")}
            >
              <MdBedroomParent className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
              <h3 className="mt-1 font-medium text-gray-700 group-hover:text-red-500 text-center whitespace-nowrap">Pool House</h3>
            </div>

            {/* Rooms */}
            <div
              className={`flex items-center justify-center flex-col hover:border-b-2 sm:hover:border-b-3 hover:border-red-400 text-xs sm:text-sm min-w-[70px] pb-2 transition-all duration-200 group flex-shrink-0 cursor-pointer ${
               cate == "Rooms" ? "border-b-2 sm:border-b-3 border-red-500" : ""
             }`}
              onClick={() => handleCategory("Rooms")}
            >
              <MdBedroomParent className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
              <h3 className="mt-1 font-medium text-gray-700 group-hover:text-red-500 text-center">Rooms</h3>
            </div>

            {/* Flat */}
            <div
              className={`flex items-center justify-center flex-col hover:border-b-2 sm:hover:border-b-3 hover:border-red-400 text-xs sm:text-sm min-w-[70px] pb-2 transition-all duration-200 group flex-shrink-0 cursor-pointer ${
               cate == "Flat" ? "border-b-2 sm:border-b-3 border-red-500" : ""
             }`}
              onClick={() => handleCategory("Flat")}
            >
              <MdOutlineHouseboat className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
              <h3 className="mt-1 font-medium text-gray-700 group-hover:text-red-500 text-center">Flat</h3>
            </div>

            {/* PG */}
            <div
              className={`flex items-center justify-center flex-col hover:border-b-2 sm:hover:border-b-3 hover:border-red-400 text-xs sm:text-sm min-w-[70px] pb-2 transition-all duration-200 group flex-shrink-0 cursor-pointer ${
               cate == "PG" ? "border-b-2 sm:border-b-3 border-red-500" : ""
             }`}
              onClick={() => handleCategory("PG")}
            >
              <LuWarehouse className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
              <h3 className="mt-1 font-medium text-gray-700 group-hover:text-red-500 text-center">PG</h3>
            </div>

            {/* Cabins */}
            <div
              className={`flex items-center justify-center flex-col hover:border-b-2 sm:hover:border-b-3 hover:border-red-400 text-xs sm:text-sm min-w-[70px] pb-2 transition-all duration-200 group flex-shrink-0 cursor-pointer ${
               cate == "Cabins" ? "border-b-2 sm:border-b-3 border-red-500" : ""
             }`}
              onClick={() => handleCategory("Cabins")}
            >
              <HiMiniBuildingOffice className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
              <h3 className="mt-1 font-medium text-gray-700 group-hover:text-red-500 text-center">Cabins</h3>
            </div>

            {/* Shop */}
            <div
              className={`flex items-center justify-center flex-col hover:border-b-2 sm:hover:border-b-3 hover:border-red-400 text-xs sm:text-sm min-w-[70px] pb-2 transition-all duration-200 group flex-shrink-0 cursor-pointer ${
               cate == "Shop" ? "border-b-2 sm:border-b-3 border-red-500" : ""
             }`}
              onClick={() => handleCategory("Shop")}
            >
              <GiVikingLonghouse className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
              <h3 className="mt-1 font-medium text-gray-700 group-hover:text-red-500 text-center">Shop</h3>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Results Dropdown - Outside navbar to prevent layout shift */}
      {searchData?.length > 0 && (
        <div 
          className="fixed z-[999] w-[calc(100vw-2rem)] sm:w-[calc(100vw-3rem)] md:w-full md:max-w-[600px] lg:max-w-[800px] left-1/2 transform -translate-x-1/2"
          style={{
            top: window.innerWidth >= 768 ? '150px' : '210px' // Dynamic positioning
          }}
        >
          <div className="bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-2xl overflow-hidden max-h-[300px] sm:max-h-[400px] overflow-y-auto mx-4 md:mx-0">
            <div className="p-3 sm:p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-700">Search Results</h3>
            </div>
            {searchData.map((search, index) => (
              <div 
                key={search._id} 
                className="p-3 sm:p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150" 
                onClick={() => handleClick(search._id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-800 text-sm sm:text-base truncate">{search.title}</div>
                    <div className="text-xs sm:text-sm text-gray-500 truncate">📍 {search.landMark}, {search.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .flex.overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}

export default Nav;