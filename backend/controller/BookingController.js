import Listing from './../model/ListingModel.js';
import Booking from './../model/BookingModel.js';
import User from './../model/UserModel.js';



export const createBooking = async (req, res) => {
    try {
        let { id } = req.params;
        let { checkIn, checkOut, totalRent } = req.body;

        let listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).json({ message: "Listing is not found" });
        }

        // ✅ Fix: Correct Date object usage
        if (new Date(checkIn) >= new Date(checkOut)) {
            return res.status(400).json({ message: "Invalid checkIn/checkOut date" });
        }

        if (listing.isBooked) {
            return res.status(400).json({ message: "Listing is already Booked" });
        }

        // ✅ Create booking
        let booking = await Booking.create({
            checkIn,
            checkOut,
            totalRent,
            host: listing.host,
            guest: req.userId,
            listing: listing._id
        });

        // ✅ Fix: Push booking ID instead of listing
        let user = await User.findByIdAndUpdate(
            req.userId,
            { $push: { booking: booking._id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User is not found" });
        }

        listing.guest = req.userId;
        listing.isBooked = true;
        await listing.save();

        return res.status(201).json(booking);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Booking error: ${error.message}` });
    }
};
