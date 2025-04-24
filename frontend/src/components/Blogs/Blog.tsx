"use client"
import BlogForm from "./BlogFrom"
import BlogContent from "./BlogContent"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Blog() {
    return (
        <div className="w-full h-dvh flex flex-col">
            <BlogForm />
            <BlogContent />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}