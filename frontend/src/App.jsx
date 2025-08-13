import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ListingPage1 from "./Pages/ListingPage1";
import ListingPage2 from "./Pages/ListingPage2";
import ListingPage3 from "./Pages/ListingPage3";
import { userDataContext } from "./Context/UserContext.jsx";
import Mylisting from "./Pages/Mylisting.jsx";

function App() {
  let { userData } = useContext(userDataContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/listingpage1"
          element={
            userData != null ? <ListingPage1 /> : <Navigate to={"/"} />
          }
        />
        <Route
          path="/listingpage2"
          element={
            userData != null ? <ListingPage2 /> : <Navigate to={"/"} />
          }
        />
        <Route
          path="/listingpage3"
          element={
            userData != null ? <ListingPage3 /> : <Navigate to={"/"} />
          }
        />

        <Route
          path="/mylisting"
          element={
            userData != null ? <Mylisting /> : <Navigate to={"/"} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
