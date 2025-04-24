import React, { useState } from "react"
import { useDeleteBlog } from "@/actions"
import { toast } from 'react-toastify'
import { Button } from "@/components/ui/button"
import BlogEdit from "./BlogEdit"
import { summerizeblog } from "@/api/Blogs"
import { Blogs } from "@/types"
import { Icons } from "@/Icon"


type Props = {
    blogs: Blogs
}

export default function BlogCard({ blogs }: Props) {
    const [isEditing, setIsEditing] = useState(false)
    const [summerizetext, setsummerizetext] = useState<string | null>("")
    const [loading, setloading] = useState<boolean>(false)
    const deleteMutation = useDeleteBlog()

    const handleDelete = async () => {
        try {
            await deleteMutation.mutateAsync(blogs.id)
            toast.success("Blog deleted successfully!")
        } catch (error) {
            toast.error("Failed to delete blog")
            console.error("Failed to delete blog:", error)
        }
    }

    const handleUpdate = () => {
        setIsEditing(false)
        toast.success("Blog updated successfully!")
    }
    const summerize = async (text: string) => {
        setloading(true)
        try {
            const srtext = await summerizeblog(text) as string
            setsummerizetext(srtext)
        }
        finally {
            setloading(false)
        }
    }

    return (
        <div className="mb-4 p-4 border rounded shadow">
            {isEditing ? (
                <BlogEdit blog={blogs} onUpdate={handleUpdate} />
            ) : (
                <>
                    <h2 className="text-xl font-bold">{blogs.title}</h2>
                    <p className="my-2">{blogs.content}</p>
                    {summerizetext && (
                        <p className="my-2 flex gap-5">
                            <span className="font-bold">SummerizeText </span>
                            {summerizetext}
                        </p>
                    )}
                    <div className="flex gap-2">
                        <Button onClick={() => setIsEditing(true)} className="bg-blue-500">
                            Edit
                        </Button>
                        <Button
                            onClick={handleDelete}
                            className="bg-red-500"
                            disabled={deleteMutation.isPending}
                        >
                            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                        </Button>
                        <Button onClick={() => summerize(blogs.content)}>
                            {loading ? <Icons.spinner className=" animate-spin" /> : " Summerize"}
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}