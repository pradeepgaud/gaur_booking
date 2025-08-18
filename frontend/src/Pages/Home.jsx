import React from "react";
import Nav from "../Components/Nav";
import { useContext } from "react";
import { listingDataContext } from "../Context/ListingContext.jsx";
import Card from "./../Components/Card.jsx";

function Home() {
  let { newlistData } = useContext(listingDataContext);

  return (
    <div>
      <Nav />

      {/* Spacer for fixed navbar height */}
      <div className="h-[250px] md:h-[180px]"></div>

      <div className="w-full min-h-[77vh] flex items-center justify-center gap-[25px] flex-wrap px-4">
        {newlistData.map((list) => (
          <Card
            key={list._id}
            title={list.title}
            landMark={list.landMark}
            city={list.city}
            image1={list.image1}
            image2={list.image2}
            image3={list.image3}
            rent={list.rent}
            id={list._id}
            ratings={list.ratings}
            isBooked={list.isBooked}
            host={list.host}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
