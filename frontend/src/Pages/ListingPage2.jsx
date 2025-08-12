import React, { useContext } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { GiFamilyHouse, GiVikingLonghouse } from "react-icons/gi";
import { HiMiniBuildingOffice } from "react-icons/hi2";
import { LuWarehouse } from "react-icons/lu";
import { BiSolidBuildingHouse } from "react-icons/bi";
import {
  MdWhatshot,
  MdBedroomParent,
  MdOutlineHouseboat,
} from "react-icons/md";
import { listingDataContext } from "./../Context/ListingContext.jsx";

function ListingPage2() {
  let navigate = useNavigate();
  let { category, setCategory } = useContext(listingDataContext);

  const categories = [
    { icon: <MdWhatshot className="w-8 h-8" />, label: "Trending" },
    { icon: <GiFamilyHouse className="w-8 h-8" />, label: "Villa" },
    { icon: <BiSolidBuildingHouse className="w-8 h-8" />, label: "FarmHouse" },
    { icon: <MdBedroomParent className="w-8 h-8" />, label: "PoolHouse" },
    { icon: <MdBedroomParent className="w-8 h-8" />, label: "Rooms" },
    { icon: <MdOutlineHouseboat className="w-8 h-8" />, label: "Flat" },
    { icon: <LuWarehouse className="w-8 h-8" />, label: "PG" },
    { icon: <HiMiniBuildingOffice className="w-8 h-8" />, label: "Cabins" },
    { icon: <GiVikingLonghouse className="w-8 h-8" />, label: "Shop" },
  ];

  const handleSelectCategory = (label) => {
    setCategory(label);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col items-center py-10 px-4 relative">
      {/* Back Button */}
      <div
        className="w-12 h-12 bg-red-600 cursor-pointer fixed top-5 left-5 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-all"
        onClick={() => navigate("/listingpage1")}
      >
        <FaArrowLeftLong className="w-6 h-6 text-white" />
      </div>

      {/* Title */}
      <div className="px-6 py-2 bg-red-600 text-white text-lg md:text-xl rounded-full shadow-lg fixed top-5 right-5">
        Set Your Category
      </div>

      {/* Content */}
      <div className="max-w-4xl w-full mt-20 flex flex-col items-center gap-8">
        <h1 className="text-xl md:text-3xl font-semibold text-gray-800 text-center">
          Which of these best describes your place?
        </h1>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 w-full">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectCategory(cat.label)}
              className={`bg-white border-2 rounded-xl flex flex-col items-center justify-center p-5 gap-2 cursor-pointer shadow-sm hover:shadow-lg hover:border-red-400 hover:scale-105 transition-all duration-300 ${
                category === cat.label
                  ? "border-red-500 shadow-lg scale-105"
                  : "border-gray-200"
              }`}
            >
              <div className="text-red-600">{cat.icon}</div>
              <h3 className="text-sm md:text-base font-medium">{cat.label}</h3>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => navigate("/listingpage3")}
          className="px-8 py-3 bg-red-600 text-white rounded-lg text-lg font-medium hover:bg-red-700 shadow-md transition-all"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ListingPage2;
