import { Response } from "express"
import { asyncerrorhandler, getDeepSeekResponse } from "../../utils"
import db from "../../db"
import { CustomRequest } from "../../types"

const create = asyncerrorhandler(async (req: CustomRequest, res: Response) => {
    const { content, title } = req.body
    const UserId = req.user?.id

    if (!content || !title) {
        res.status(400).json({ message: "Content and title are required" })
        return
    }

    await db.from("Blog").insert([{ title, content, UserId }])

    res.status(201).json({ message: "Successfully created blog" })
    return
})
const deleteBlog = asyncerrorhandler(async (req: CustomRequest, res: Response) => {
    const { id } = req.query
    const UserId = req.user?.id

    if (!id) {
        res.status(400).json({ message: "Blog ID is required" })
        return
    }

    await db.from("Blog").delete().match({ id, UserId })

    res.status(200).json({ message: "Successfully deleted blog" })
    return
})
const update = asyncerrorhandler(async (req: CustomRequest, res: Response) => {
    const { id } = req.query
    const { title, content } = req.body
    const UserId = req.user?.id

    console.log(title, content)

    if (!id || (!title && !content)) {
        res.status(400).json({ message: "Blog ID and at least one of title/content are required" })
        return
    }

    const updateData: { title?: string; content?: string } = {}
    if (title) updateData.title = title
    if (content) updateData.content = content

    await db.from("Blog").update(updateData).match({ id, UserId })

    res.status(200).json({ message: "Successfully updated blog" })
    return
})

const getAll = asyncerrorhandler(async (req: CustomRequest, res: Response) => {
    const UserId = req.user?.id

    const { data: blogs } = await db
        .from("Blog")
        .select("id ,title,content")
        .eq("UserId", UserId)
        .order("id", { ascending: false })

    res.status(200).json(blogs)
})
const getById = asyncerrorhandler(async (req: CustomRequest, res: Response) => {
    const { id } = req.query
    const UserId = req.user?.id

    if (!id) {
        res.status(400).json({ message: "Blog ID is required" })
        return
    }

    const { data: blog } = await db
        .from("Blog")
        .select("*")
        .eq("id", id)
        .eq("UserId", UserId)
        .single()

    res.status(200).json(blog)
})

const summerizeblog = asyncerrorhandler(async (req: CustomRequest, res: Response) => {

    const { text } = req.body

    if (!text) {
        res.status(404).json({
            mesage: "text is required"
        })
        return
    }

    const summerizetext = await getDeepSeekResponse(`${text} just summerize these thing`)

    res.status(200).json(summerizetext)
    return

})


export { create, deleteBlog, update, getAll, getById, summerizeblog }