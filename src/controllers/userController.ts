import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({
            where: { email }
        })

        if (!user) {
            return res.status(404).json({
                message: "Tidak di temukan"
            })
        }

        const isMatch = await bcrypt.compare(password, user.getDataValue("password"));
        if (isMatch) {
            return res.status(401).json({ message: "password salah " });
        }

        //tp ini harus ada column token di databsenya
        const token = uuidv4();
        user.setDataValue("token", token);
        await user.save();


        //kalau nambah cookie
        // res.cookie("user_token", token, {
        //     maxAge: 1000 * 60 * 60 * 24, 
        //     httpOnly: true, 
        // });
        return res.json({
            message: "Login sukses",
            token
        })

    } catch (error) {
        // console.error(error);
        // return res.status(500).json({ message: "Login error "})
        //pake yg error handle
        next(error);
    }
}

//cadangan kalau loginnya ga pake cookie
// export const loginUser = async ( req: Request, res: Response) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({
//             where: { email }
//         })

//         if (!user) {
//             return res.status(404).json({
//                 message: "Tidak di temukan"
//             })
//         }

//         const isMatch = await bcrypt.compare(password, user.getDataValue("password"));
//         if (isMatch) {
//             return res.status(401).json({ message: "password salah "});
//         }

//         //tp ini harus ada column token di databsenya
//         res.cookie("cookie_user", user.getDataValue("email"), {
//             maxAge: 1000 * 60 * 60 * 24,
//             httpOnly: true
//         })

//         return res.json({message: "login berhasil"})

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Login error "})
//     }
// }


export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("BODY:", req.body);

        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Users.create({
            name,
            email,
            password: hashedPassword
        });

        //ini biar passwordnya ga ikut ke kirim kalau disuruh
        // const userData = user.toJSON();
        // delete userData.password;
        //console.log("CREATED:", userData.toJSON());
        //res.status(201).json(userData);

        console.log("CREATED:", user.toJSON());

        res.status(201).json(user);
    } catch (error) {
        next(error)
    }
};