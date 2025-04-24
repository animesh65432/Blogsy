import React from 'react'
import { BlogSchema } from "@/schema"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateBlog } from "@/actions"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from 'react-toastify'

type BlogSchmeaTypes = z.infer<typeof BlogSchema>;

export default function BlogForm() {
    const createMutation = useCreateBlog()

    const form = useForm<BlogSchmeaTypes>({
        resolver: zodResolver(BlogSchema),
        defaultValues: {
            title: "",
            content: ""
        }
    })

    const onSubmit = async (data: BlogSchmeaTypes) => {
        try {
            await createMutation.mutateAsync({
                title: data.title,
                content: data.content
            })

            form.reset()


            toast.success("Blog post created successfully!")

        } catch (error) {
            toast.error("Failed to create blog post")
            console.error("Failed to create blog:", error)
        }
    }

    return (
        <div className="h-[30vh] p-4">
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
                    <div className="w-full flex justify-center">
                        <Button
                            type="submit"
                            className="w-[40%] uppercase"
                            disabled={createMutation.isPending}
                        >
                            {createMutation.isPending ? 'Creating...' : 'Create'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
