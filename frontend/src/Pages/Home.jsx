import React from "react";
import Nav from "../Components/Nav";
import { useContext } from "react";
import { listingDataContext } from "../Context/ListingContext.jsx";
import Card from "./../Components/Card.jsx";

function Home() {
  let { listingData, setListingData } = useContext(listingDataContext);
  return (
    <div>
      <Nav />

      <div className="w-[100vw] h-[77vh] flex items-center justify-center gap-[25px] flex-wrap mt-[250px] md:mt-[180px]">
        {listingData.map((list) => (
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

export default Home;
