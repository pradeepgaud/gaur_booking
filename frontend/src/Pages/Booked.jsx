import React, { useContext, useEffect, useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import { BookingDataContext } from "../Context/BookingContext";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Star from "../Components/Star";
import axios from "axios";
import { authDataContext } from "../Context/AuthContext.jsx";
import { userDataContext } from "../Context/UserContext.jsx";
import { listingDataContext } from "../Context/ListingContext.jsx";

function Booked() {
  const { bookingData } = useContext(BookingDataContext);
  let [star, setStar] = useState(null);
  let [isSubmitting, setIsSubmitting] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  let { getCurrentUser } = useContext(userDataContext);
  let { getListing } = useContext(listingDataContext);
  let { cardDetails } = useContext(listingDataContext);

  const navigate = useNavigate();

  const handleRatings = async (id) => {
    if (!star) {
      alert("Please select a rating before submitting!");
      return;
    }
    
    setIsSubmitting(true);
    try {
      let result = await axios.post(
        serverUrl + `/api/listing/ratings/${id}`,
        {
          ratings: star,
        },
        { withCredentials: true }
      );
      await getCurrentUser();
      await getListing();
      console.log(result);
      alert("Thank you for your rating! 🌟");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Failed to submit rating. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStar = async (value) => {
    setStar(value);
    console.log("you rated", value);
  };

  const getRatingText = () => {
    if (!star) return "Please rate your experience";
    const texts = {
      1: "Poor 😔",
      2: "Fair 😐", 
      3: "Good 😊",
      4: "Very Good 😄",
      5: "Excellent! 🤩"
    };
    return texts[star] || "";
  };

  useEffect(() => {
    if (!bookingData) {
      console.log("No booking data found, redirecting to home");
      navigate("/");
    }
  }, [bookingData, navigate]);

  if (!bookingData) {
    return (
      <div className="w-[100vw] min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
        <div className="text-xl text-gray-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-[100vw] min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="w-[90%] max-w-[550px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-105 transition-all duration-300">
        
        {/* Header Section with Animation */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-10 transform -skew-y-6"></div>
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
              <GiConfirmed className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-green-100 text-sm">
              Your reservation has been successfully processed
            </p>
          </div>
        </div>

        {/* Booking Details */}
        <div className="p-6 space-y-4">
          
          {/* Booking ID */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500">
            <span className="font-semibold text-gray-700 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Booking ID
            </span>
            <span className="font-mono text-blue-600 bg-blue-100 px-3 py-1 rounded-lg text-sm font-bold">
              #{bookingData._id ? bookingData._id.slice(-8).toUpperCase() : "N/A"}
            </span>
          </div>

          {/* Owner Email */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-500">
            <span className="font-semibold text-gray-700 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Owner Email
            </span>
            <span className="text-green-600 font-medium bg-green-100 px-3 py-1 rounded-lg text-sm">
              {bookingData.host?.email || "N/A"}
            </span>
          </div>

          {/* Total Rent */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border-l-4 border-red-500">
            <span className="font-semibold text-gray-700 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
              Total Rent
            </span>
            <span className="text-red-600 font-bold text-lg bg-red-100 px-3 py-1 rounded-lg">
              ₹{bookingData.totalRent?.toLocaleString() || "N/A"}
            </span>
          </div>

          {/* Check-in Date */}
          {bookingData.checkIn && (
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border-l-4 border-purple-500">
              <span className="font-semibold text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Check-in
              </span>
              <span className="text-purple-600 font-medium bg-purple-100 px-3 py-1 rounded-lg text-sm">
                {new Date(bookingData.checkIn).toLocaleDateString("en-IN", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          )}

          {/* Check-out Date */}
          {bookingData.checkOut && (
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-l-4 border-orange-500">
              <span className="font-semibold text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                Check-out
              </span>
              <span className="text-orange-600 font-medium bg-orange-100 px-3 py-1 rounded-lg text-sm">
                {new Date(bookingData.checkOut).toLocaleDateString("en-IN", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          )}
        </div>

        {/* ✨ Enhanced Rating Section */}
        <div className="mx-6 mb-6 p-6 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-2xl border border-yellow-200 shadow-lg">
          <div className="text-center">
            {/* Rating Header */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                <span className="text-2xl">⭐</span>
                Rate Your Experience
              </h2>
              <p className="text-gray-600 text-sm">
                Help others by sharing your feedback
              </p>
            </div>

            {/* Current Rating Display */}
            <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-yellow-100">
              <div className="text-lg font-semibold text-gray-700 mb-2">
                {star ? `${star} out of 5 stars` : "No rating selected"}
              </div>
              <div className="text-sm font-medium" style={{
                color: star >= 4 ? '#10B981' : star >= 3 ? '#F59E0B' : star >= 1 ? '#EF4444' : '#6B7280'
              }}>
                {getRatingText()}
              </div>
            </div>

            {/* Star Rating Component */}
            <div className="mb-6 p-4 bg-white rounded-xl shadow-sm flex justify-center">
              <Star onRate={handleStar} />
            </div>

            {/* Submit Button */}
            <button
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                star
                  ? "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 hover:scale-105 shadow-xl hover:shadow-2xl"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => handleRatings(cardDetails._id)}
              disabled={!star || isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>🚀</span>
                  Submit Rating
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <span>🏠</span>
              Go Home
            </button>
            <button
              onClick={() => navigate("/mybooking")}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <span>📋</span>
              My Bookings
            </button>
          </div>
        </div>

        {/* Success Animation Overlay */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-pulse"></div>
      </div>
    </div>
  );
}

export default Booked;