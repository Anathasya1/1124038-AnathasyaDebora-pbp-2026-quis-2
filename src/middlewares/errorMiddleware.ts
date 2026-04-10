import { Request, Response, NextFunction } from "express";

export const errorHanldeMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Ada error', err.message);
    res.status(500).json({ message: err.message }); 
}
