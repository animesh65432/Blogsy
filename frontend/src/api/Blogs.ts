import { Call } from "@/service/call"
import { Blogs } from "@/types"

export const createBlog = (content: string, title: string) => Call({
    path: "/blog/create",
    method: "POST",
    request: {
        content,
        title
    }
})

export const deleteBlog = (id: number) => Call({
    path: `/blog/delete?id=${id}`,
    method: "DELETE"
})

export const update = (id: number, content?: string, title?: string) => Call({
    path: `/blog/update?id=${id}`,
    method: "PUT",
    request: {
        content,
        title
    }
})

export const GetBlogs = (): Promise<Blogs[]> => Call({
    path: "/blog/Get",
    method: "GET"
})

export const GetBlogById = (id: number): Promise<Blogs> => Call({
    path: `/blog/GetBlog?id=${id}`,
    method: "GET"
})

export const summerizeblog = (text: string) => Call({
    path: "/blog/summerize",
    method: "POST",
    request: { text }
})