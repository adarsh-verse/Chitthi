import express from "express";
import { getCurrentUser } from "../controllers/user_controller.js";
import isAuth from "../middlewares/isAuth.js";


const user_Router = express.Router()

user_Router.get("/current",isAuth, getCurrentUser)

export default user_Router