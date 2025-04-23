import { Request, Response } from "express"
import db from "../../db"
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import config from "../../config"
import { asyncerrorhandler } from "../../utils"

const createUser = asyncerrorhandler(async (req: Request, res: Response) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        res.status(400).json({ message: "Invalid credentials" });
        return
    }

    const { data: existingUser } = await db
        .from("User")
        .select("*")
        .eq("email", email)
        .single();

    if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: newUser } = await db
        .from("User")
        .insert([
            {
                email,
                name,
                Password: hashedPassword,
            },
        ])
        .single();

    res.status(201).json({ message: "User created successfully", user: newUser });
    return
});

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Invalid credentials" });
        return
    }

    const { data: user } = await db
        .from("User")
        .select("*")
        .eq("email", email)
        .single();

    if (!user) {
        res.status(400).json({ message: "User does not exist" });
        return
    }

    const isPasswordValid = await bcrypt.compare(password, user.Password);
    if (!isPasswordValid) {
        res.status(400).json({ message: "Invalid password" });
        return
    }

    const token = jsonwebtoken.sign({ email: user.email, id: user.id }, config.JSONWEBTOEKN as string, {
        expiresIn: "1h",
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 24 * 60 * 60 * 1000
    });


    res.status(200).json({ message: "Successfully logged in" });
    return
};


export { createUser, loginUser }