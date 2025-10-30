import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {upload} from "../middlewares/multer.js"
import { getMessages, sendMessage } from "../controllers/message_controllers.js";


const message_Router = express.Router()


message_Router.put("/send/:receiver",isAuth , upload.single("image"), sendMessage)
message_Router.get("/:receiver", isAuth, getMessages);

export default message_Router