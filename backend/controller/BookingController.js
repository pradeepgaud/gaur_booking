import User from '../model/UserModel.js';
import Listing from '../model/ListingModel.js';
import Booking from '../model/BookingModel.js';

// Create a new booking
export const createBooking = async (req, res) => {
    try {
        const { id: listingId } = req.params; // URL से id लें
        const { checkIn, checkOut, totalRent } = req.body; // body से booking details लें
        const userId = req.userId;

        console.log("Creating booking for listing:", listingId);
        console.log("User ID:", userId);
        console.log("Booking details:", { checkIn, checkOut, totalRent });

        // Check if listing exists
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        // Check if listing is already booked
        if (listing.isBooked) {
            return res.status(400).json({ message: "Listing is already booked" });
        }

        // Check if user already booked this listing
        const user = await User.findById(userId);
        if (user.booking.includes(listingId)) {
            return res.status(400).json({ message: "You have already booked this listing" });
        }

        // Create new booking record
        const newBooking = new Booking({
            host: listing.host,
            guest: userId,
            listing: listingId,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            totalRent,
            status: "booked"
        });

        const savedBooking = await newBooking.save();
        
        // Populate host details
        await savedBooking.populate("host", "email");

        // Update user's booking array
        await User.findByIdAndUpdate(
            userId,
            { $push: { booking: listingId } },
            { new: true }
        );

        // Update listing's guest field and mark as booked
        await Listing.findByIdAndUpdate(listingId, {
            guest: userId,
            isBooked: true
        });

        return res.status(200).json({ 
            message: "Booking successful",
            booking: savedBooking
        });

    } catch (error) {
        console.error("CreateBooking error:", error);
        return res.status(500).json({ message: `Booking error: ${error.message}` });
    }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
    try {
        const { id: listingId } = req.params;
        const userId = req.userId;

        console.log("Canceling booking for listing:", listingId);

        // Find and update the listing
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        // Update listing
        await Listing.findByIdAndUpdate(listingId, {
            guest: null,
            isBooked: false
        });

        // Remove from user's booking array
        await User.findByIdAndUpdate(userId, {
            $pull: { booking: listingId }
        }, { new: true });

        // Update booking status in Booking collection
        await Booking.findOneAndUpdate(
            { listing: listingId, guest: userId, status: "booked" },
            { status: "cancelled" }
        );

        return res.status(200).json({ message: "Booking cancelled successfully" });

    } catch (error) {
        console.error("Cancel booking error:", error);
        return res.status(500).json({ message: "Booking cancel error" });
    }
};


export const ratingListing = async(req,res) =>{
    try {
        let {id} = req.params
        let {ratings} = req.body
        let listing = await Listing.findById(id)
        if(!listing){
            return res.status(404).json({message:'listing not found'})
        }
        listing.ratings = Number(ratings)
        await listing.save();
        return res.status(200).json({ratings:listing.ratings})

    } catch (error) {
         return res.status(500).json({ message: "ratting error" });
    }
}