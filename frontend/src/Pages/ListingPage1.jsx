import React, { useContext } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "./../Context/ListingContext.jsx";

function ListingPage1() {
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
  } = useContext(listingDataContext);

  const handleImage1 = (e) => {
    let file = e.target.files[0];
    setBackEndImage1(file);
    setFrontEndImage1(URL.createObjectURL(file));
  };

  const handleImage2 = (e) => {
    let file = e.target.files[0];
    setBackEndImage2(file);
    setFrontEndImage2(URL.createObjectURL(file));
  };

  const handleImage3 = (e) => {
    let file = e.target.files[0];
    setBackEndImage3(file);
    setFrontEndImage3(URL.createObjectURL(file));
  };

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center relative overflow-auto py-10 px-4">
      <form className="max-w-[900px] w-full bg-white flex flex-col items-start gap-4 mt-20 md:mt-32" onSubmit={(e) =>{e.preventDefault()
        navigate("/listingpage2")
      }}>
        {/* Back Button */}
        <div
          className="w-[50px] h-[50px] bg-red-600 cursor-pointer fixed top-5 left-5 rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition-all"
          onClick={() => navigate("/")}
        >
          <FaArrowLeftLong className="w-[30px] h-[25px] text-white" />
        </div>

        {/* Page Title */}
        <div className="w-[200px] h-[50px] text-[18px] md:text-[20px] bg-[#f14242] text-white flex items-center justify-center rounded-[30px] fixed top-5 right-5 shadow-lg">
          Setup Your Home
        </div>

        {/* Title */}
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="title" className="text-lg md:text-xl font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full h-[40px] border-2 border-[#555656] rounded-lg text-[16px] md:text-[18px] px-4 focus:outline-none focus:border-red-500"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="_bhk house or best title"
          />
        </div>

        {/* Description */}
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="des" className="text-lg md:text-xl font-medium">
            Description
          </label>
          <textarea
            id="des"
            className="w-full h-[80px] border-2 border-[#555656] rounded-lg text-[16px] md:text-[18px] px-4 py-2 resize-none focus:outline-none focus:border-red-500"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>

        {/* Image 1 */}
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="img1" className="text-lg md:text-xl font-medium">
            Image1
          </label>
          <div className="flex items-center w-full h-[40px] border-2 border-[#555656] rounded-lg">
            <input
              type="file"
              id="img1"
              className="w-[100%] text-[15px] px-[10px] file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-red-500 file:text-white
                hover:file:bg-red-600 cursor-pointer"
              required
              onChange={handleImage1}
            />
          </div>
        </div>

        {/* Image 2 */}
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="img2" className="text-lg md:text-xl font-medium">
            Image2
          </label>
          <div className="flex items-center w-full h-[40px] border-2 border-[#555656] rounded-lg">
            <input
              type="file"
              id="img2"
              className="w-[100%] text-[15px] px-[10px] file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-red-500 file:text-white
                hover:file:bg-red-600 cursor-pointer"
              required
              onChange={handleImage2}
            />
          </div>
        </div>

        {/* Image 3 */}
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="img3" className="text-lg md:text-xl font-medium">
            Image3
          </label>
          <div className="flex items-center w-full h-[40px] border-2 border-[#555656] rounded-lg">
            <input
              type="file"
              id="img3"
              className="w-[100%] text-[15px] px-[10px] file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-red-500 file:text-white
                hover:file:bg-red-600 cursor-pointer"
              required
              onChange={handleImage3}
            />
          </div>
        </div>

        {/* Rent */}
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="rent" className="text-lg md:text-xl font-medium">
            Rent
          </label>
          <input
            type="text"
            id="rent"
            className="w-full h-[40px] border-2 border-[#555656] rounded-lg text-[16px] md:text-[18px] px-4 focus:outline-none focus:border-red-500"
            required
            onChange={(e) => setRent(e.target.value)}
            value={rent}
            placeholder="Rs------ par day "
          />
        </div>

        {/* City */}
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="city" className="text-lg md:text-xl font-medium">
            City
          </label>
          <input
            type="text"
            id="city"
            className="w-full h-[40px] border-2 border-[#555656] rounded-lg text-[16px] md:text-[18px] px-4 focus:outline-none focus:border-red-500"
            required
            onChange={(e) => setCity(e.target.value)}
            value={city}
            placeholder="city, country"
          />
        </div>

        {/* Landmark */}
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="landmark" className="text-lg md:text-xl font-medium">
            Landmark
          </label>
          <input
            type="text"
            id="landmark"
            className="w-full h-[40px] border-2 border-[#555656] rounded-lg text-[16px] md:text-[18px] px-4 focus:outline-none focus:border-red-500"
            required
            onChange={(e) => setLandMark(e.target.value)}
            value={landMark}
          />
        </div>

        {/* Next Button */}
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="px-8 md:px-20 py-2 bg-red-600 text-white rounded-lg text-[16px] md:text-[18px] hover:bg-red-700 transition-all mt-4"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default ListingPage1;
