import { Request, Response, NextFunction } from "express";

export const errorHanldeMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Ada error', err.message);
    res.status(500).json({ message: err.message }); 
    // next();
}

//ini dipake di bagian misal mau getAllstaff gitu nah pas bagian try catch 
// jadi catch (error) { next(error) } ga ush pake yg 500 500 lagi 
//contohnya di controller
// export const getAllStaff = async (req: Request, res: Response, next:NextFunction) => {
//     try {
//         const staff = await Staff.findAll();
//         res.json(staff);
//     } catch (error) {
//         next(error)
//     }
// }