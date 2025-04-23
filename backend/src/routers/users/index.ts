import { Router } from "express"
import { createUser, loginUser } from "../../controllers"

const userrouter = Router()

userrouter.post("/create", createUser)
userrouter.post("/login", loginUser)

export default userrouter