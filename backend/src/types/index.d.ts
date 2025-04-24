import { Request, Response, NextFunction } from "express"

export type asyncfuncerrorpayload = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export type JsonPayload = {
    email: string
}

export interface CustomRequest extends Request {
    user?: {
        id: number,
        email: string
    }
}