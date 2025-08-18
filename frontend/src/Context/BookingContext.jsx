import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { authDataContext } from "./AuthContext";
import { userDataContext } from "./UserContext";
import { listingDataContext } from "./ListingContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const BookingDataContext = createContext();

function BookingContext({ children }) {
  let [checkIn, setCheckIn] = useState("");
  let [checkOut, setCheckOut] = useState("");
  let [total, setTotal] = useState(0);
  let [night, setNight] = useState(0);
  let { serverUrl } = useContext(authDataContext);
  let { getCurrentUser } = useContext(userDataContext);
  let { getListing } = useContext(listingDataContext);
  let [bookingData, setBookingData] = useState(null);
  let [booking, setBooking] = useState(false);
  let navigate = useNavigate();

  // ✅ STEP 3: Reset function to clear all booking data
  const resetBookingState = () => {
    console.log("🔄 Resetting booking state");
    setBookingData(null);
    setCheckIn("");
    setCheckOut("");
    setTotal(0);
    setNight(0);
    setBooking(false);
  };

  const handleBooking = async (id) => {
    // ✅ STEP 2: Input Validation
    if (!id) {
      toast.error("Listing ID is missing");
      return;
    }
    
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }
    
    if (new Date(checkIn) >= new Date(checkOut)) {
      toast.error("Check-out date must be after check-in date");
      return;
    }
    
    if (total <= 0) {
      toast.error("Total amount must be greater than 0");
      return;
    }

    // ✅ STEP 1: Detailed logging for debugging
    console.log("=== BOOKING ATTEMPT START ===");
    console.log("Booking ID:", id);
    console.log("Check-in:", checkIn);
    console.log("Check-out:", checkOut);
    console.log("Total:", total);
    console.log("Current bookingData:", bookingData);
    
    setBooking(true);
    try {
      let result = await axios.post(
        serverUrl + `/api/booking/create/${id}`,
        {
          checkIn,
          checkOut,
          totalRent: total,
        },
        { withCredentials: true }
      );
      
      await getCurrentUser();
      await getListing();
      
      setBookingData(result.data.booking);
      console.log("✅ Booking Success - Data:", result.data.booking);
      
      setBooking(false);
      toast.success('Booking Successfully')
      navigate("/booked");
    } catch (error) {
      // ✅ DETAILED ERROR LOGGING
      console.log("❌ === BOOKING ERROR DETAILS ===");
      console.log("Error Message:", error.message);
      console.log("Error Name:", error.name);
      console.log("Error Code:", error.code);
      console.log("Error Status:", error.response?.status);
      console.log("Error Status Text:", error.response?.statusText);
      console.log("Error Response Data:", error.response?.data);
      console.log("Error Response Headers:", error.response?.headers);
      console.log("Full Error Object:", error);
      console.log("=== ERROR END ===");

      setBookingData(null);
      setBooking(false);
      
      // ✅ STEP 6: Enhanced error handling
      if (error.response) {
        const status = error.response.status;
        const errorData = error.response.data;
        const errorMessage = errorData?.message || `Server Error: ${status}`;
        
        // Handle specific error cases
        switch (status) {
          case 400:
            // Bad request - might be date conflict or validation error
            toast.error(`Booking Error: ${errorMessage}`);
            if (errorMessage.includes('already booked') || errorMessage.includes('conflict')) {
              toast.info("Please try selecting different dates");
            }
            break;
          case 401:
            toast.error("Please login to continue");
            navigate('/login');
            break;
          case 409:
            // Conflict - probably duplicate booking
            toast.error("Booking conflict: Please refresh and try again");
            // Force refresh user and listing data
            await getCurrentUser();
            await getListing();
            break;
          default:
            toast.error(`Booking Failed: ${errorMessage}`);
        }
      } else if (error.request) {
        toast.error("Network Error: Unable to reach server");
      } else {
        toast.error("Booking failed. Please try again.");
      }
    }
  };

  const cancelBooking = async (id) => {
    console.log("=== CANCEL BOOKING START ===");
    console.log("Cancel Booking ID:", id);
    
    try {
      let result = await axios.delete(serverUrl + `/api/booking/cancel/${id}`, {
        withCredentials: true,
      });
      
      console.log("✅ Booking Cancelled Successfully");
      console.log("Cancel Response:", result.data);
      
      // ✅ STEP 4: Reset all booking state after successful cancel
      resetBookingState();
      
      await getCurrentUser();
      await getListing();
      
      toast.success('Booking cancelled successfully');
      
    } catch (error) {
      console.log("❌ Cancel Error Details:");
      console.log("Error Response:", error.response?.data);
      console.log("Error Status:", error.response?.status);
      
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    }
  };

  let value = {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    total,
    setTotal,
    night,
    setNight,
    bookingData,
    setBookingData,
    handleBooking,
    cancelBooking,
    booking,
    setBooking,
    resetBookingState, // ✅ STEP 5: Export reset function
  };

  return (
    <BookingDataContext.Provider value={value}>
      {children}
    </BookingDataContext.Provider>
  );
}

export default BookingContext;