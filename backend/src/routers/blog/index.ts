import { create, deleteBlog, update, getAll, getById, summerizeblog } from "../../controllers"
import { Router } from "express"
import { auth } from "../../middleware"
import { RequestHandler } from "express"

const blog = Router()

blog.post("/create", auth, create as RequestHandler)
blog.delete("/delete", auth, deleteBlog as RequestHandler)
blog.put("/update", auth, update as RequestHandler)
blog.get("/Get", auth, getAll as RequestHandler)
blog.get("/GetBlog", auth, getById as RequestHandler)
blog.post("/summerize", summerizeblog as RequestHandler)

export default blog