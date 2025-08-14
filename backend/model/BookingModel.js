import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        require: true
    },
    status: {
        type: String,
        ref: ["booked", "cancle"],
        default: "booked",
        require: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    totalRent:{
        type:Number,
        required:true
    },
    

},{timestamps:true})


const Booking = mongoose.model("Booking",bookingSchema)

export default Booking