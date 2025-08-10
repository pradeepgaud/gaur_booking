import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import ListingPage1 from "./Pages/ListingPage1";
import ListingPage2 from "./Pages/ListingPage2";
import ListingPage3 from "./Pages/ListingPage3";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/listingpage1" element={<ListingPage1 />} />
        <Route path="/listingpage2" element={<ListingPage2 />} />
        <Route path="/listingpage3" element={<ListingPage3 />} />
      </Routes>
    </>
  );
}

export default App;
