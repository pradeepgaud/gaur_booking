import React, { useContext } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import { userDataContext } from "./../Context/UserContext";

function ViewCard() {
  const navigate = useNavigate();
  const { state } = useLocation();
  let { userData } = useContext(userDataContext);
  const cardDetails = state?.listing; // ✅ Get data from navigation state

  if (!cardDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  // const handleEdit = () => {
  //   // Add your edit functionality here
  //   console.log("Edit clicked");
  // };

  // const handleBooking = () => {
  //   // Add your booking functionality here
  //   console.log("Booking clicked");
  // };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col items-center py-10 px-4 relative">
      {/* Back Button */}
      <div
        className="w-12 h-12 bg-red-600 cursor-pointer fixed top-5 left-5 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-all z-10"
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong className="w-6 h-6 text-white" />
      </div>

      {/* Location Header */}
      <div className="w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px] pl-16 md:pl-0">
        <h1 className="text-[20px] text-[#272727] md:text-[30px] font-semibold">
          {`In ${cardDetails.landMark?.toUpperCase()}, ${cardDetails.city?.toUpperCase()}`}
        </h1>
      </div>

      {/* Images */}
      <div className="w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row mb-6">
        <div className="w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white rounded-lg shadow-sm">
          <img
            src={cardDetails.image1}
            alt="Main property view"
            className="w-[100%] h-[100%] object-cover"
          />
        </div>
        <div className="w-[100%] h-[50%] flex items-center justify-center md:w-[30%] md:h-[100%] md:flex-col md:ml-2">
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white rounded-lg shadow-sm md:mb-2">
            <img
              src={cardDetails.image2}
              alt="Property view 2"
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white rounded-lg shadow-sm">
            <img
              src={cardDetails.image3}
              alt="Property view 3"
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="w-[95%] md:w-[80%] space-y-4 mb-8">
        {/* Title */}
        <div className="text-[18px] md:text-[25px] font-semibold text-gray-900">
          {`${cardDetails.title?.toUpperCase()} ${cardDetails.category?.toUpperCase()}, ${cardDetails.landMark?.toUpperCase()}`}
        </div>

        {/* Description */}
        <div className="text-[16px] md:text-[20px] text-gray-700 leading-relaxed">
          {cardDetails.description}
        </div>

        {/* Price */}
        <div className="text-[20px] md:text-[28px] font-bold text-red-600">
          ₹{cardDetails.rent}/day
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-[95%] md:w-[80%] flex flex-col sm:flex-row gap-4 justify-center items-center">
        {cardDetails.host == userData._id && (
          <button
            // onClick={handleEdit}
            className="w-full sm:w-auto px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white text-[16px] md:text-[18px] font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Edit Property
          </button>
        )}

      { cardDetails.host !== userData._id &&  <button className="w-full sm:w-auto px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-[16px] md:text-[18px] font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
          Book Now
        </button>}
      </div>
    </div>
  );
}

export default ViewCard;
