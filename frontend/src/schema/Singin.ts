import z from "zod"

const LoginSchema = z.object({
    email: z.string().nonempty({ message: "Email is required." }),
    Password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .max(256, { message: "Password must be less than 256 characters." }),
})

export default LoginSchema