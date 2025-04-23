import { create, deleteBlog, update, getAll, getById } from "../../controllers"
import { Router } from "express"
import { auth } from "../../middleware"

const blog = Router()

blog.post("/create", auth, create)
blog.delete("/delete", auth, deleteBlog)
blog.put("/update", auth, update)
blog.get("/Get", auth, getAll)
blog.get("/GetBlog", auth, getById)

export default blog