import { Request, Response, NextFunction } from "express"
import db from "../db"
import config from "../config"
import JSONWEBTOEKN from "jsonwebtoken"
import { JsonPayload } from "../types"

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token

    if (!token) {
        res.status(400).json({
            messsage: "token is required"
        })
        return
    }

    const data = JSONWEBTOEKN.verify(token, config.JSONWEBTOEKN as string) as JsonPayload
    if (!data) {
        res.status(400).json({
            message: "token is not vaild"
        })
        return
    }
    const { email } = data

    const { data: existingUser, error } = await db
        .from("User")
        .select("*")
        .eq("email", email)
        .single();

    if (!existingUser) {
        res.status(400).json({ message: "User did't found" });
        return
    }

    if (error) {
        res.status(500).json({ message: "Error checking user", error });
        return
    }


    req.user = existingUser
    next()

}


export default auth