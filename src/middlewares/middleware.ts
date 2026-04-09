import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization; 

    if (!authHeader) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1] as string; 

    const user = await User.findOne({
        where: { token: token}
    })

    if (!user) {
        return res.status(401).json({ message: "token invalid"})
    }

    (req  as any).user = {
        id: user.getDataValue("id")
        //dst
    }

    //bisa cara gini
    // const userData = user.toJSON();
    // delete userData.password;
    // delete userData.token;

    // (req as any).user = userData;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

//kalau no token dan nambah coookie gitu
// export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const rawCookie = req.headers.cookie; 

//     if (!rawCookie) {
//       return res.status(401).json({ message: "Cookie kosong blm login" });
//     }

//     const userEmail = rawCookie
//         .split("; ")
//         .find(row => row.startsWith("cookie_user="))
//         ?.split("=")[1];
    
//     if (!userEmail) {
//         return res.status(401).json({ message: "sesi invalid"})
//     }

//     const user = await User.findOne({
//         where: { token: token}
//     })

//     if (!user) {
//         return res.status(401).json({ message: "token invalid"})
//     }

//     //bisa cara gini
//     const userData = user.toJSON();
//     delete userData.password;

//     (req as any).user = userData;

//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };