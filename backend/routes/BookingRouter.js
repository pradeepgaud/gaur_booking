import express from "express"
import isAuth from "../middleware/isAuth.js"
import { createBooking } from "../controller/BookingController.js"




let bookingRouter = express.Router()
bookingRouter.post("/create",isAuth,createBooking)


export default bookingRouter