import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import roomsRoute from './routes/rooms.js';
import hotelsRoute from './routes/hotels.js';

const app = express();
dotenv.config();

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO);
    console.log("Connected to DB")
	} catch (error) {
		throw error;
	}
};

mongoose.connection.on("disconnected", () => {
  console.log('mongoDB disconnected')
})
mongoose.connection.on("connected", () => {
  console.log('mongoDB connected')
})


// app.get("/", (req, res) => {
//   res.send("Hello.....")
// })

//middlewares
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/rooms", roomsRoute);
app.use("/api/v1/hotels", hotelsRoute);


app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || "Something went wrong";

	return res.status(500).json({
		success: false,
		status:errorStatus,
		message: errorMessage,
		stack: err.stack,
	})
})


app.listen(8000, () => {
  connect();
	console.log("Connected to backend");
});

// mongodb+srv://hr_bappy:<password>@cluster0.skxpdim.mongodb.net/?retryWrites=true&w=majority
//56:53