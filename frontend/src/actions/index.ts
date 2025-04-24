import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { GetBlogs, GetBlogById, deleteBlog, update, createBlog } from "@/api/Blogs"
export const useGetBlogs = () => {
    return useQuery({
        queryKey: ['blogs'],
        queryFn: GetBlogs
    })
}

export const useGetBlogById = (id: number) => {
    return useQuery({
        queryKey: ['blog', id],
        queryFn: () => GetBlogById(id),
        enabled: !!id
    })
}

export const useCreateBlog = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ content, title }: { content: string, title: string }) => createBlog(content, title),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
        }
    })
}

export const useUpdateBlog = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, content, title }: { id: number, content?: string, title?: string }) =>
            update(id, content, title),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['blog', variables.id] })
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
        }
    })
}

export const useDeleteBlog = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => deleteBlog(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
        }
    })
}