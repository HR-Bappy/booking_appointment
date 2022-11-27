import express from "express";
import { createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/create", verifyAdmin, createHotel);

//UPDATE
router.put("/update/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/delete/:id", verifyAdmin, deleteHotel);

//GET
router.get("/get/:id", getHotel);

//GET ALL
router.get("/get", getAllHotel);

export default router;
