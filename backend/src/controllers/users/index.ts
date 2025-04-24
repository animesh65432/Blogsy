import { Request, Response } from "express"
import db from "../../db"
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import config from "../../config"
import { asyncerrorhandler } from "../../utils"
import Config from "../../config"

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

const loginUser = asyncerrorhandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    console.log(email, "loginuser")

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

    const token = jsonwebtoken.sign({ email: user.email }, config.JSONWEBTOEKN as string, {
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 24 * 60 * 60 * 1000
    });


    res.status(200).json({ message: "Successfully logged in" });
    return
});

const googleCallback = asyncerrorhandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    console.log(email, "googlcallback")
    if (!email) {
        res.status(400).json({ message: "Invalid credentials. No email found." });
        return;
    }

    const { data: existingUser } = await db
        .from("User")
        .select("*")
        .eq("email", email)
        .single();

    if (existingUser) {
        const token = jsonwebtoken.sign(
            { email },
            Config.JSONWEBTOEKN!,
            { expiresIn: "15d" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 15,
            sameSite: "lax",
        });
        res.status(200).json({ message: "User already exists." });
        return;
    }

    const { data: newUser } = await db
        .from("User")
        .insert([
            {
                email,
            },
        ])
        .single();

    if (!newUser) {
        res.status(400).json({ message: "User creation failed." });
        return;
    }

    const token = jsonwebtoken.sign(
        { email },
        Config.JSONWEBTOEKN!,
        { expiresIn: "15d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 15,
        sameSite: "lax",
    });

    res.status(200).json({ message: "Successfully logged in." });
    return
});

export { createUser, loginUser, googleCallback }