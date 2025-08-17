import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import Card from "../Components/Card.jsx";
import { userDataContext } from "../Context/UserContext.jsx";

function MyBooking() {
    const navigate = useNavigate();
    const { userData, getCurrentUser } = useContext(userDataContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                await getCurrentUser(); // Refresh user data
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    console.log("userData in MyBooking:", userData);
    console.log("userData.booking:", userData?.booking);

    if (loading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="text-2xl text-gray-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center relative pt-[50px]">
            {/* Back Button */}
            <div
                className="w-[50px] h-[50px] bg-red-600 cursor-pointer absolute top-[20px] left-[20px] rounded-full flex items-center justify-center"
                onClick={() => navigate("/")}
            >
                <FaArrowLeftLong className="w-[30px] h-[25px] text-white" />
            </div>

            {/* MY BOOKING Heading */}
            <div className="border-[2px] border-[#908c8c] px-[30px] py-[10px] text-[30px] rounded-md text-[#613b3b] font-semibold md:w-[600px] text-center">
                MY BOOKINGS
            </div>

            <div className="w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px] px-4">
                {userData && userData.booking && userData.booking.length > 0 ? (
                    userData.booking.map((booking, index) => {
                        console.log(`Booking ${index}:`, booking);
                        return (
                            <Card
                                key={booking._id || index}
                                title={booking.title}
                                landMark={booking.landMark}
                                city={booking.city}
                                image1={booking.image1}
                                image2={booking.image2}
                                image3={booking.image3}
                                rent={booking.rent}
                                id={booking._id}
                                ratings={booking.ratings || 0}
                                isBooked={booking.isBooked}
                                host={booking.host}
                            />
                        );
                    })
                ) : (
                    <div className="text-center text-gray-500 text-xl mt-10">
                        <div className="mb-4">📋</div>
                        <div>No bookings found</div>
                        <div className="text-sm mt-2">Book some properties to see them here!</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyBooking;