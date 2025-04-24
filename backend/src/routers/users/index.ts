import { Router } from "express"
import { createUser, loginUser, googleCallback } from "../../controllers"

const userrouter = Router()

userrouter.post("/create", createUser)
userrouter.post("/login", loginUser)
userrouter.post("/google/auth", googleCallback)


export default userrouter