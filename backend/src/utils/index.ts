import { Request, Response, NextFunction } from "express"
import bcrypt from "bcrypt"
import db from "../db";
import genAI from "../service";
const API_URL = "https://api.deepseek.com/v1/chat/completions";
const asyncerrorhandler = <T extends Request>(
    func: (req: T, res: Response, next: NextFunction) => Promise<void>
) => {
    return (req: T, res: Response, next: NextFunction) => {
        func(req, res, next).catch((err) => next(err));
    };
};
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
async function getDeepSeekResponse(prompt: string) {
    try {
        const result = await genAI.generateContent(` can you summerize these == "${prompt}"`);
        const response = result.response.text()
        return response
    } catch (error) {
        console.error("⚠️ Error calling DeepSeek AI:", error);
        return null;
    }
}
export { asyncerrorhandler, createDummyUser, getDeepSeekResponse }