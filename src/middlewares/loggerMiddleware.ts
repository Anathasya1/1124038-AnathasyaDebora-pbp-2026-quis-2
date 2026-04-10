import { Request, Response, NextFunction } from "express";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const date = new Date().toISOString();

    console.log(`${date} ${req.method} ${req.url}`); 

    next();
}
