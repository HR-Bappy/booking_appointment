import express from "express";
import User from "../models/User.js";


const router = express.Router();

//CREATE
// export const createUser = async (req, res, next) => {
// 	const newUser = new User(req.body);

// 	try {
// 		const saveUser = await newUser.save();
// 		res.status(200).json(saveUser);
// 	} catch (ree) {
// 		next(err);
// 	}
// };

//UPDATE
export const updateUser =  async (req, res,err) => {
	try {
		const updateUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
		res.status(200).json(updateUser);
	} catch (ree) {
		next(err);
	}
};

//DELETE
export const deleteUser = async (req, res, next) => {
	try {
    await User.findByIdAndDelete(req.params.id);
		res.status(200).json("User has been deleted.");
	} catch (ree) {
		next(err);
	}
};

//GET
export const getUser = async (req, res, next) => {
	try {
    const user = await User.findById(req.params.id);
		res.status(200).json(user);
	} catch (ree) {
		next(err);
	}
};

//GET ALL
export const getAllUser = async (req, res, next) => {
	try {
    const users = await User.find();
		res.status(200).json(users);
	} catch (err) {
		next(err)
	}
};

export default router;
