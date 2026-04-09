import { Request, Response, NextFunction } from "express";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const date = new Date().toISOString();

    console.log(`${date} ${req.method} ${req.url}`); //nanti munculnya gini cpntph [10:00:00] POST /api/register

    next();
}

//dipake buat register aja
//router.post("/register", validateRegister, createUser); buat di routesnya