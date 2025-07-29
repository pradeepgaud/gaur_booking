import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import authRouter from './routes/AuthRoute.js'
import cookieParser from 'cookie-parser'
dotenv.config()

const port = process.env.PORT || 3000 
const app = express()

app.use(express.json())
app.use(cookieParser())

// meddileware
// http://localhost:8000/api/auth/signup
app.use("/api/auth",authRouter)

app.listen(port, () => {
    connectDb()
    console.log(`Server is runing at port${port}`)
})