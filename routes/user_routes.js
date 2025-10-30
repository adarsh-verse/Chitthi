import express from "express";
import { editProfile, getAllUsers, getCurrentUser } from "../controllers/user_controller.js";
import isAuth from "../middlewares/isAuth.js";
import {upload} from "../middlewares/multer.js"


const user_Router = express.Router()

user_Router.get("/current",isAuth, getCurrentUser)
user_Router.put("/profile",isAuth , upload.single("image"), editProfile)
user_Router.get("/getUsers", isAuth , getAllUsers);

export default user_Router