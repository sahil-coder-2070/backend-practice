import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';

//To allowing ip to run server and talk with server
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// This is settings this is for accepting data , from where data is coming and how much i want to accept

app.use(express.json({ limit: "16kb" }))

//This data is coming form URL like it tells space is + or %20
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// This to store asstes 
app.use(express.static("public"))

// cookieParser
app.use(cookieParser())

const app = express()

export default app