import { Call } from "../service/call"
export const createUser = (email: string, password: string, name: string) => Call({
    path: "/users/create",
    method: "POST",
    request: {
        email,
        password,
        name
    }
})

export const loginUser = (email: string, password: string) => Call({
    path: "/users/login",
    method: "POST",
    request: {
        email,
        password,
    }
})

export const logwithgoogle = (email: string) => {
    console.log(email, "the email")
    return Call({
        path: "/users/google/auth",
        method: "POST",
        request: {
            email
        }
    })
}
