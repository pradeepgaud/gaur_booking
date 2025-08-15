import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import { userDataContext } from "./../Context/UserContext";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { authDataContext } from "../Context/AuthContext";
import { listingDataContext } from "../Context/ListingContext";
import { FaStar } from "react-icons/fa";

function ViewCard() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userData } = useContext(userDataContext);
  const cardDetails = state?.listing; // ✅ Get data from navigation state

  let [title, setTitle] = useState(cardDetails?.title || "");
  let [description, setDescription] = useState(cardDetails?.description || "");
  let [backEndImage1, setBackEndImage1] = useState(null);
  let [backEndImage2, setBackEndImage2] = useState(null);
  let [backEndImage3, setBackEndImage3] = useState(null);
  let [rent, setRent] = useState(cardDetails?.rent || "");
  let [city, setCity] = useState(cardDetails?.city || "");
  let [landMark, setLandMark] = useState(cardDetails?.landMark || "");
  // let [category, setCategory] = useState(cardDetails?.category || "");
  let [updatePopUp, setUpdatePopUp] = useState(false);
  let [bookingPopUp, setBookingPopUp] = useState(false);
  // let [adding, setAdding] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  let { updating, setUpdating } = useContext(listingDataContext);
  let { deleteing, setDeleteing } = useContext(listingDataContext);
  let [minDate, setMinDate] = useState("");

  const handleUpdateListing = async () => {
    setUpdating(true);
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("image1", backEndImage1);
      formData.append("image2", backEndImage2);
      formData.append("image3", backEndImage3);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landMark", landMark);
      // formData.append("category", category);

      const res = await axios.put(
        // Change to PUT
        serverUrl + `/api/listing/update/${cardDetails._id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUpdating(false);
      if (res.status === 200) {
        console.log("✅ 200 OK");
      } else {
        console.log(`⚠️ Unexpected status: ${res.status}`);
      }

      console.log("Response Data:", res.data);
      navigate("/");
      setTitle("");
      setDescription("");
      setBackEndImage1(null);
      setBackEndImage2(null);
      setBackEndImage3(null);
      setRent("");
      setCity("");
      setLandMark("");
      // setCategory("");
    } catch (error) {
      console.error("❌ 500 ERROR");
      setUpdating(false);
      console.error(error.response?.data || error.message);
    }
  };

  const handleDeleteListing = async () => {
    setDeleteing(true);
    try {
      const res = await axios.delete(
        // Change to PUT
        serverUrl + `/api/listing/delete/${cardDetails._id}`,

        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(res.data);
      navigate("/");
      setDeleteing(false);
    } catch (error) {
      console.log(error);
      setDeleteing(false);
    }
  };

  const handleImage1 = (e) => {
    let file = e.target.files[0];
    setBackEndImage1(file);
  };

  const handleImage2 = (e) => {
    let file = e.target.files[0];
    setBackEndImage2(file);
  };

  const handleImage3 = (e) => {
    let file = e.target.files[0];
    setBackEndImage3(file);
  };

  useEffect(() => {
    let today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  if (!cardDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

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
        <div className="text-[18px] md:text-[25px] font-semibold text-gray-900">
          {`${cardDetails.title?.toUpperCase()} ${cardDetails.category?.toUpperCase()}, ${cardDetails.landMark?.toUpperCase()}`}
        </div>
        <div className="text-[16px] md:text-[20px] text-gray-700 leading-relaxed">
          {cardDetails.description}
        </div>
        <div className="text-[20px] md:text-[28px] font-bold text-red-600">
          ₹{cardDetails.rent}/day
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-[95%] md:w-[80%] flex flex-col sm:flex-row gap-4 justify-center items-center">
        {cardDetails.host === userData._id && (
          <button
            className="w-full sm:w-auto px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white text-[16px] md:text-[18px] font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            onClick={() => setUpdatePopUp((prev) => !prev)}
          >
            Edit listing
          </button>
        )}
        {cardDetails.host !== userData._id && (
          <button
            className="w-full sm:w-auto px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-[16px] md:text-[18px] font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            onClick={() => setBookingPopUp((prev) => !prev)}
          >
            Reserve
          </button>
        )}
      </div>

      {/* Update Listing Modal */}
      {updatePopUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-[100] p-4">
          <ImCross
            className="w-10 h-10 p-2 cursor-pointer absolute top-5 right-5 bg-red-500 hover:bg-red-600 rounded-full shadow-lg text-white transition-all"
            onClick={() => setUpdatePopUp(false)}
          />
          <form
            className="bg-[#1f1f1f] text-white w-full max-w-2xl rounded-2xl shadow-xl p-6 md:p-8 overflow-y-auto max-h-[90vh] border border-gray-700"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-white">
              Update Your Details
            </h2>
            {/* Title */}
            <div className="w-full flex flex-col gap-2 mb-4">
              <label htmlFor="title" className="text-lg font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full h-12 border border-gray-600 rounded-lg px-4 bg-transparent text-white focus:outline-none focus:border-red-500"
                required
                placeholder="_bhk house or best title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>

            {/* Description */}
            <div className="w-full flex flex-col gap-2 mb-4">
              <label htmlFor="des" className="text-lg font-medium">
                Description
              </label>
              <textarea
                id="des"
                className="w-full h-24 border border-gray-600 rounded-lg px-4 py-2 bg-transparent text-white resize-none focus:outline-none focus:border-red-500"
                required
                placeholder="Enter detailed description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>

            {/* Images */}
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="img1" className="text-lg md:text-xl font-medium">
                Image1
              </label>
              <div className="flex items-center w-full h-[40px] border-2 border-[#555656] rounded-lg">
                <input
                  type="file"
                  id="img1"
                  className="w-[100%] text-[15px] px-[10px] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600 cursor-pointer"
                  onChange={handleImage1}
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <label htmlFor="img2" className="text-lg md:text-xl font-medium">
                Image2
              </label>
              <div className="flex items-center w-full h-[40px] border-2 border-[#555656] rounded-lg">
                <input
                  type="file"
                  id="img2"
                  className="w-[100%] text-[15px] px-[10px] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600 cursor-pointer"
                  onChange={handleImage2}
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <label htmlFor="img3" className="text-lg md:text-xl font-medium">
                Image3
              </label>
              <div className="flex items-center w-full h-[40px] border-2 border-[#555656] rounded-lg">
                <input
                  type="file"
                  id="img3"
                  className="w-[100%] text-[15px] px-[10px] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600 cursor-pointer"
                  // required
                  onChange={handleImage3}
                />
              </div>
            </div>

            {/* Rent */}
            <div className="w-full flex flex-col gap-2 mb-4">
              <label htmlFor="rent" className="text-lg font-medium">
                Rent
              </label>
              <input
                type="text"
                id="rent"
                className="w-full h-12 border border-gray-600 rounded-lg px-4 bg-transparent text-white focus:outline-none focus:border-red-500"
                required
                placeholder="Rs------ per day"
                onChange={(e) => setRent(e.target.value)}
                value={rent}
              />
            </div>

            {/* City */}
            <div className="w-full flex flex-col gap-2 mb-4">
              <label htmlFor="city" className="text-lg font-medium">
                City
              </label>
              <input
                type="text"
                id="city"
                className="w-full h-12 border border-gray-600 rounded-lg px-4 bg-transparent text-white focus:outline-none focus:border-red-500"
                required
                placeholder="City, Country"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>

            {/* Landmark */}
            <div className="w-full flex flex-col gap-2 mb-4">
              <label htmlFor="landmark" className="text-lg font-medium">
                Landmark
              </label>
              <input
                type="text"
                id="landmark"
                className="w-full h-12 border border-gray-600 rounded-lg px-4 bg-transparent text-white focus:outline-none focus:border-red-500"
                required
                placeholder="Nearby landmark"
                onChange={(e) => setLandMark(e.target.value)}
                value={landMark}
              />
            </div>

            {/* Submit */}
            <div className="w-full flex flex-wrap justify-center gap-4 mt-6">
              {/* Update Button */}
              <button
                type="button"
                className="min-w-[150px] px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-lg font-medium shadow-lg transition-all duration-300 w-full sm:w-auto"
                onClick={handleUpdateListing}
                disabled={updating}
              >
                {updating ? "Updating..." : "Update Listing"}
              </button>

              {/* Delete Button */}
              <button
                type="button"
                className="min-w-[150px] px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-lg font-medium shadow-lg transition-all duration-300 w-full sm:w-auto"
                // de
                onClick={handleDeleteListing}
                disabled={deleteing}
              >
                {deleteing ? "Delete..." : "Delete Listing"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Booking  */}

      {bookingPopUp && (
        <div className="w-[100%] min-h-[100%] flex items-center justify-center flex-col gap-[30px] bg-[white] absolute top-[0px] z-[100] p-[20px] backdrop-blur-sm md:flex-row md:gap-[100px]">
          <ImCross
            className="w-10 h-10 p-2 cursor-pointer absolute top-5 right-5 bg-red-500 hover:bg-red-600 rounded-full shadow-lg text-white transition-all"
            onClick={() => setBookingPopUp(false)}
          />
          <form className="max-w-[450px] w-[90%] bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-6 border border-gray-200">
            {/* Title */}
            <h1 className="text-2xl font-semibold text-center border-b pb-3 text-gray-800">
              Confirm & Book
            </h1>

            {/* Trip Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Your trip
              </h3>

              {/* CheckIn */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
                <label
                  htmlFor="checkin"
                  className="text-base font-medium text-gray-700 min-w-[90px]"
                >
                  Check-In
                </label>
                <input
                  type="date"
                  min={minDate}
                  id="checkin"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-[200px] focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              {/* CheckOut */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <label
                  htmlFor="checkout"
                  className="text-base font-medium text-gray-700 min-w-[90px]"
                >
                  Check-Out
                </label>
                <input
                  type="date"
                  id="checkout"
                  min={minDate}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-[200px] focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            {/* Book Now Button */}
            <div className="flex justify-center mt-4">
              <button
                type="button"
                className="w-full sm:w-auto px-10 sm:px-16 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold text-lg rounded-full shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                Book Now
              </button>
            </div>
          </form>

          <div className="max-w-[450px] w-[90%] bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-6 border border-gray-200">
            <div className="w-[95%] h-[30%] border-[1px] border-[#dedddd] rounded-lg flex justify-start items-center gap-[8px] p-[20px] overflow-hidden">
              <div className="w-[70px] h-[90px] flex items-center justify-center flex-shrink-0 rounded-lg md:w-[100px] md:h-[100px]">
                <img
                  className="w-[100%] h-[100%] rounded-lg"
                  src={cardDetails.image1}
                  alt=""
                />
              </div>

              <div className="w-[80%] h-[100px] gap-[5px]">
                <h1 className="w-[90%] truncate">{`IN ${cardDetails.landMark.toUpperCase()},${cardDetails.city.toUpperCase()}`}</h1>
                <h1>{cardDetails.title.toUpperCase()}</h1>
                <h1>{cardDetails.category.toUpperCase()}</h1>
                <h1 className="flex items-center justify-start gap-[5px]">
                  {" "}
                  <FaStar className="text-[#FFD700]" />
                  {cardDetails.ratings}
                </h1>
              </div>
              <div className="w-[95%] h-[60%] border-[1px]  border-[#dedddd] rounded-lg flex justify-start items-start p-[20px]  gap-[15px] flex-col"> 

                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewCard;
