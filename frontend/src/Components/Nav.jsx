import React from "react";
import logo from "../assets/logo.jpg";
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

function Nav() {
  return (
    <div>
      <div className="w-[100vw] min-h-[80px] border-b-[1px] border-[#dcdcdc] px-[40px] flex items-center justify-between">
        <div>
          <img src={logo} alt="logo" className="w-[70px] md:w-[90px]" />
        </div>
        <div className="w-[35%] relative">
          <input
            type="text"
            className="w-[100%] px-[30px] py-[8px] border-[2px] border-[#bababa] outline-none overflow-auto rounded-[30px] text-[17px]"
            placeholder="Any Where | Any Location | Any City"
          />
          <button className="absolute p-[10px] rounded-[50px] bg-[red] right-[3%] top-[3px]">
            <FiSearch className="w-[18px] h-[18px] text-white" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-[10px] ">
          <span className="text-[18px] corsor-pointer rounded-[50px] hover:bg-[#ded9d9] px-[8px] py-[5px]">
            List your home
          </span>
          <button className="px-[20px] py-[10px] flex items-center justify-center gap-[5px] border-[1px] border-[#8d8c8c] rounded-[50px] hover:shadow-lg">
            <span>
              {" "}
              <RxHamburgerMenu className="w-[20px] h-[20px]" />
            </span>
            <span>
              {" "}
              <CgProfile className="w-[23px] h-[23px]" />
            </span>
          </button>
        </div>
      </div>
      <div className="w-[100vw] h-[85px] bg-white flex items-center justify-center cursor-pointer gap-[40px]">
        <div className="flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px]">
          <MdWhatshot  className="w-[30px] h-[30px] text-black"/>
          <h3>Trending</h3>
        </div>
        

       
         <div className="flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px]">
          <GiFamilyHouse  className="w-[30px] h-[30px] text-black"/>
          <h3>Villa</h3>
        </div>

         <div className="flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px]">
          <BiSolidBuildingHouse  className="w-[30px] h-[30px] text-black"/>
          <h3>Farm House</h3>
        </div>

         <div className="flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px]">
          <MdBedroomParent  className="w-[30px] h-[30px] text-black"/>
          <h3>Pool House</h3>
        </div>

         <div className="flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px]">
          <MdBedroomParent  className="w-[30px] h-[30px] text-black"/>
          <h3>Rooms</h3>
        </div>

         <div className="flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px]">
          <MdOutlineHouseboat  className="w-[30px] h-[30px] text-black"/>
          <h3>Flat</h3>
        </div>

         <div className="flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px]">
          <LuWarehouse  className="w-[30px] h-[30px] text-black"/>
          <h3>PG</h3>
        </div>

         <div className="flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px]">
          <HiMiniBuildingOffice  className="w-[30px] h-[30px] text-black"/>
          <h3>Cabins</h3>
        </div>

         <div className="flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px]">
          <GiVikingLonghouse  className="w-[30px] h-[30px] text-black"/>
          <h3>Shop</h3>
        </div>
      </div>
    </div>
  );
}

export default Nav;
