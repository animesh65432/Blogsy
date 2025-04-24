import { z } from "zod"

const BlogSchema = z.object({
    title: z.string().nonempty({ message: "title is required" }),
    content: z.string().nonempty({ message: "content is reuired" })
})

export default BlogSchema