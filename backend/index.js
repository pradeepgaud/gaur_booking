import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import authRouter from './routes/AuthRoute.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from './routes/UserRoute.js'
import listingRouter from './routes/ListingRoute.js'
import bookingRouter from './routes/BookingRouter.js'
dotenv.config()

const port = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173", // your frontend port
    credentials: true                // required for cookies
}));
// meddileware
// http://localhost:8000/api/auth/signup
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/listing", listingRouter)
app.use("/api/booking", bookingRouter)

app.listen(port, () => {
    connectDb()
    console.log(`Server is runing at port${port}`)
})