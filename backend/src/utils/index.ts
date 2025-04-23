import { Request, Response, NextFunction } from "express"
import { asyncfuncerrorpayload } from "../types"
import bcrypt from "bcrypt"
import db from "../db";
const asyncerrorhandler = (func: asyncfuncerrorpayload) => {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch(err => next(err));
    }
}

const createDummyUser = async () => {
    try {
        const hashPassword = await bcrypt.hash("testpassword", 10);

        const { data: findUser, error: findUserError } = await db
            .from("User")
            .select("*")
            .eq("email", "testemail@gmail.com")
            .single();

        if (findUser) {
            return;
        }


        const { error: createUserError } = await db
            .from("User")
            .insert([
                {
                    email: "testemail@gmail.com",
                    Password: hashPassword,
                },
            ]);

        if (createUserError) {
            console.log("Error creating user:", createUserError);
        }

    } catch (error) {
        console.log("Error:", error);
    }
};
export { asyncerrorhandler, createDummyUser }