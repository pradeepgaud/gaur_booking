import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { authDataContext } from "./AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const listingDataContext = createContext();

function ListingContext({ children }) {
  let navigate = useNavigate();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [frontEndImage1, setFrontEndImage1] = useState(null);
  let [frontEndImage2, setFrontEndImage2] = useState(null);
  let [frontEndImage3, setFrontEndImage3] = useState(null);
  let [backEndImage1, setBackEndImage1] = useState(null);
  let [backEndImage2, setBackEndImage2] = useState(null);
  let [backEndImage3, setBackEndImage3] = useState(null);
  let [rent, setRent] = useState("");
  let [city, setCity] = useState("");
  let [landMark, setLandMark] = useState("");
  let [category, setCategory] = useState("");
  let [adding, setAdding] = useState(false);
  let [listingData, setListingData] = useState([]);
  let [newlistData, setNewListData] = useState([]);
  let [cardDetails, setCardDetails] = useState(null);
  let { serverUrl } = useContext(authDataContext);

  const handleAddListing = async () => {
    setAdding(true);
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
      formData.append("category", category);

      const res = await axios.post(serverUrl + "/api/listing/add", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Status check
      if (res.status === 200) {
        console.log("✅ 200 OK");
      } else {
        console.log(`⚠️ Unexpected status: ${res.status}`);
      }
      setAdding(false);
      console.log("Response Data:", res.data);
      navigate("/");
      setTitle("");
      setDescription("");
      setFrontEndImage1(null);
      setFrontEndImage2(null);
      setFrontEndImage3(null);
      setBackEndImage1(null);
      setBackEndImage2(null);
      setBackEndImage3(null);
      setRent("");
      setCity("");
      setLandMark("");
      setCategory("");
    } catch (error) {
      setAdding(false);
      console.error("❌ 500 ERROR");
      console.error(error.response?.data || error.message);
    }
  };

  const handleViewCard = async (id) => {
    try {
      if (!id) {
        console.error("No ID provided for listing");
        return;
      }
      console.log("Fetching listing with ID:", id); // Debug log
      let result = await axios.get(
        serverUrl + `/api/listing/findlistingbyid/${id}`,
        { withCredentials: true }
      );
      setCardDetails(result.data);
      console.log("Listing found:", result.data);
      navigate("/viewcard", { state: { listing: result.data } });
    } catch (error) {
      console.error("Error fetching listing:", error);
      console.error("Error response:", error.response?.data);
    }
  };

  const getListing = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/listing/get", {
        withCredentials: true,
      });
      setListingData(result.data);
      setNewListData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListing();
  }, [adding]);

  let value = {
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
    listingData,
    setListingData,
    handleAddListing,
    getListing,
    newlistData,
    setNewListData,
    handleViewCard,
    cardDetails,
    setCardDetails,
  };

  return (
    <div>
      <listingDataContext.Provider value={value}>
        {children}
      </listingDataContext.Provider>
    </div>
  );
}

export default ListingContext;
