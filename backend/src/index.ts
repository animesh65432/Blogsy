import Config from "./config"
import express from "express"
import cors from "cors"
import { Errorhandler } from "./middleware"
import cookieParser from "cookie-parser"
import { createDummyUser } from "./utils"
import router from "./routers"
const app = express()
app.use(cors({
    origin: Config.FRONTEND_URL,
    credentials: true
}))

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/api", router)
app.use(Errorhandler)
app.listen(Config.PORT, () => {
    createDummyUser()
    console.log(`server start at ${Config.PORT}`)
})