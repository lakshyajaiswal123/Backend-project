import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

//json k data ki kitni limit hogi
app.use(express.json({limit:"16kb"}))

//URL M DATA KESA AAYEGA
app.use(express.urlencoded({extended:true,limit:"16kb"}))

//kabhi bhi files folder aajata h toh hum static ki madat se use krte h
app.use(express.static("public"))

//cookie sirf server hi read kr paaye
app.use(cookieParser())