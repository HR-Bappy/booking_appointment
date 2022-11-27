import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

//CREATE
export const createHotel = async (req, res, next) => {
	const newHotel = new Hotel(req.body);

	try {
		const saveHotel = await newHotel.save();
		res.status(200).json(saveHotel);
	} catch (ree) {
		next(err);
	}
};

//UPDATE
export const updateHotel =  async (req, res,err) => {
	try {
		const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
		res.status(200).json(updateHotel);
	} catch (ree) {
		next(err);
	}
};

//DELETE
export const deleteHotel = async (req, res, next) => {
	try {
    await Hotel.findByIdAndDelete(req.params.id);
		res.status(200).json("Hotel has been deleted.");
	} catch (ree) {
		next(err);
	}
};

//GET
export const getHotel = async (req, res, next) => {
	try {
    const hotel = await Hotel.findById(req.params.id);
		res.status(200).json(hotel);
	} catch (ree) {
		next(err);
	}
};

//GET ALL
export const getAllHotel = async (req, res, next) => {
	try {
    const hotels = await Hotel.find();
		res.status(200).json(hotels);
	} catch (err) {
		next(err)
	}
};

export default router;