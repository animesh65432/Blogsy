import userrouter from "./users";
import blog from "./blog"
import { Router } from "express"
import { rateLimiter } from "../middleware"

const router = Router()
router.use(rateLimiter(10, 2 * 60 * 1000))
router.use("/users", userrouter)
router.use("/blog", blog)

export default router