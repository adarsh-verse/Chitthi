import express from "express";
import {login, logOut, signUp} from "../controllers/auth_controllers.js"

const auth_Router = express.Router()

auth_Router.post("/signup", signUp)
auth_Router.post("/login", login)
auth_Router.get("/logout", logOut)

export default auth_Router