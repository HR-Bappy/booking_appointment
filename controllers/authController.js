import express from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/User.js";
import { createError } from "../Utils/error.js";

const router = express.Router();

//REGISTER
export const register = async (req, res, next) => {

	try {

		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);


		const newUser = new User({
			username:req.body.username,
			email:req.body.email,
			isAdmin: req.body.isAdmin || false,
			password:hash
		});

		console.log(newUser);

		await newUser.save();
		res.status(200).send("User has been created.");
	} catch (ree) {
		next(err);
	}
};

//REGISTER
export const login = async (req, res, next) => {

	try {

		let user
		user = await User.findOne({username:req.body.username});
		if(!user) user = await User.findOne({email:req.body.email});
		if(!user) return next(createError(404, "User not found!"));

		const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
		if(!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));

		const token = jwt.sign({id : user._id, isAdmin: user.isAdmin}, process.env.JWT);

		const {password, isAdmin, ...otherDetails} = user?._doc;


		res.cookie("access_token", token, {
			httpOnly: true,
		}).status(200).json({...otherDetails});
	} catch (err) {
		next(err);
	}
};

export default router;
