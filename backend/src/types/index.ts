import { Request, Response, NextFunction } from "express"

export type asyncfuncerrorpayload = (req: Request, res: Response, next: NextFunction) => Promise<void>
export type JsonPayload = {
    id: number
    email: string
}

