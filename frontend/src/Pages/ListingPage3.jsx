import React, { useContext } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext.jsx";

function ListingPage3() {
  let navigate = useNavigate();
  let {
    title,
    setTitle,
    description,
    setDescription,
    frontEndImage1,
    setFrontEndImage1,
    frontEndImage2,
    setFrontEndImage2,
    frontEndImage3,
    setFrontEndImage3,
    backEndImage1,
    setBackEndImage1,
    backEndImage2,
    setBackEndImage2,
    backEndImage3,
    setBackEndImage3,
    rent,
    setRent,
    city,
    setCity,
    landMark,
    setLandMark,
    category,
    setCategory,
    adding,
    setAdding,
    handleAddListing
  } = useContext(listingDataContext);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col items-center py-12 px-4 relative">
      <div
        className="w-14 h-14 bg-gradient-to-r from-red-600 to-red-700 cursor-pointer fixed top-6 left-6 rounded-xl flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-red-200"
        onClick={() => navigate("/listingpage2")}
      >
        <FaArrowLeftLong className="w-6 h-6 text-white" />
      </div>

      <div className="w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-8 mt-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 w-full">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
            <h1 className="text-[20px] text-gray-800 md:text-[30px] text-ellipsis text-nowrap overflow-hidden font-bold tracking-wide">
              {`In ${landMark.toUpperCase()}, ${city.toUpperCase()}`}
            </h1>
          </div>
          <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-transparent rounded-full mt-2"></div>
        </div>
      </div>

      {/* img */}
      <div className="w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row mb-8">
        <div className="w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img src={frontEndImage1} alt="" className="w-[100%] h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>

        <div className="w-[100%] h-[50%] flex items-center justify-center md:w-[50%] md:h-[100%] md:flex-col gap-2 md:ml-2">
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img src={frontEndImage2} alt="" className="w-[100%] h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img src={frontEndImage3} alt="" className="w-[100%] h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </div>

      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] mb-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 w-full">
          <h2 className="font-bold text-gray-800 text-[18px] md:text-[25px] leading-tight">
            {`${title.toUpperCase()} ${category.toUpperCase()}, ${landMark.toUpperCase()}`}
          </h2>
        </div>
      </div>

      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] mb-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 w-full">
          <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Description</h3>
          <p className="text-gray-700 text-[18px] md:text-[25px] leading-relaxed">
            {description.toUpperCase()}
          </p>
        </div>
      </div>

      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] mb-6">
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl shadow-lg border border-red-200 p-6 w-full">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
            <span className="text-red-700 font-bold text-[18px] md:text-[25px]">
              {`₹${rent}/day`}
            </span>
          </div>
        </div>
      </div>

      {/* button */}
      <div className="w-[95%] h-[50px] flex items-center justify-start px-[100px]">
        <button
          className={`px-[50px] py-[12px] text-[white] text-[18px] md:px-[100px] rounded-xl font-semibold transition-all duration-300 ${
            adding 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:shadow-lg hover:scale-105 active:scale-95'
          }`}
          onClick={handleAddListing} 
          disabled={adding}
        >
          {adding ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>adding...</span>
            </div>
          ) : (
            "Add Listing"
          )}
        </button>
      </div>
    </div>
  );
}

export default ListingPage3;