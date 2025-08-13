import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { userDataContext } from "./../Context/UserContext";
import Card from "../Components/Card";

function Mylisting() {
  const navigate = useNavigate();
  let { userData } = useContext(userDataContext);
  return (
    <div className="w-full min-h-screen flex flex-col items-center relative pt-[50px]">
      {/* Back Button */}
      <div
        className="w-[50px] h-[50px] bg-red-600 cursor-pointer absolute top-[20px] left-[20px] rounded-full flex items-center justify-center"
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong className="w-[30px] h-[25px] text-white" />
      </div>

      {/* MY LISTING Heading */}
      <div className="border-[2px] border-[#908c8c] px-[30px] py-[10px] text-[30px] rounded-md text-[#613b3b] font-semibold md:w-[600px] text-center">
        MY LISTING
      </div>

      <div className="w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]">
        {userData.listing.map((list) => (
          <Card
            title={list.title}
            landMark={list.landMark}
            city={list.city}
            image1={list.image1}
            image2={list.image2}
            image3={list.image3}
            rent={list.rent}
            id={list.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Mylisting;
