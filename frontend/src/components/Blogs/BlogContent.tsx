"use client"
import React from "react"
import BlogCard from "./BlogCard"
import { useGetBlogs } from "@/actions"

export default function BlogContent() {
    const { data: blogs, isLoading, } = useGetBlogs()
    if (isLoading) return <div>Loading blogs...</div>

    if (!blogs) {
        return <div className="h-[70vh] flex justify-center items-center">
            <div>no blogs </div>
        </div>
    }

    return (
        <div className="h-[70vh] overflow-y-auto p-8 w-full">
            {blogs.map((blog) => (
                <BlogCard
                    key={blog.id}
                    blogs={blog}
                />
            ))}
        </div>
    )
}
