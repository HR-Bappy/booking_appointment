import express from "express";
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
// router.post("/create", createUser);

// router.get("/auth", verifyToken, (req, res, next) => {
//   res.send("Login")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Verified")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Verified Admin")
// })

//UPDATE
router.put("/update/:id", verifyUser, updateUser);

//DELETE
router.delete("/delete/:id", verifyUser, deleteUser);

//GET
router.get("/get/:id", verifyUser, getUser);

//GET ALL
router.get("/get", verifyAdmin, getAllUser);

export default router;
