import React from "react"
import { Blogs } from "@/types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { BlogSchema } from "@/schema"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useUpdateBlog } from "@/actions"
import { toast } from 'react-toastify'
import z from "zod"

type Props = {
    blog: Blogs
    onUpdate: (updated: Blogs) => void
}

const BlogEdit = ({ blog, onUpdate }: Props) => {
    const updateMutation = useUpdateBlog()

    const form = useForm<z.infer<typeof BlogSchema>>({
        resolver: zodResolver(BlogSchema),
        defaultValues: {
            title: blog.title,
            content: blog.content
        }
    })

    const onSubmit = async (data: z.infer<typeof BlogSchema>) => {
        try {
            const updated = await updateMutation.mutateAsync({
                id: blog.id,
                title: data.title,
                content: data.content
            })

            // onUpdate(updated)
        } catch (error) {
            toast.error("Failed to update blog")
            console.error("Failed to update blog:", error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <Input {...field} />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <Textarea {...field} className="resize-none" />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full"
                    disabled={updateMutation.isPending}
                >
                    {updateMutation.isPending ? 'Updating...' : 'Update'}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => onUpdate(blog)}
                >
                    Cancel
                </Button>
            </form>
        </Form>
    )
}

export default BlogEdit