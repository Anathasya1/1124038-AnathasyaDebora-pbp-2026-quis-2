import { Comments } from "../../models/Comments";
import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

export const getAllComments = async (req: Request, res: Response,  next: NextFunction) => {
    try {
        const posts = await Comments.findAll();
        res.json(posts);
    } catch (error) {
        next(error);
    }
}

export const createNewComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        payload.id = uuidv4();

        const { postId, content, username } = payload;

        if (!postId || !content || !username) {
            return res.status(400).json({
                status: "Fail",
                message: "Data tidak boleh kosong"
            })
        }

        const newTable = await Comments.create(payload);

        return res.status(201).json({
            status: "Success",
            data: newTable
        })

    } catch (error) {
        next(error)
    }
}

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const comment = await Comments.findByPk(id as string);

        if (!comment) {
            return res.status(404).json({
                status: "Fail",
                message: "Comment dengan ID tersebut tidak ditemukan"
            })
        }

        await comment.update({ content });
        return res.json({
            success: true,
            message: "Data Comment berhasil di update",
            data: comment
        })

    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const comment = await Comments.findByPk(id as string);

        if (!comment) {
            return res.status(404).json({
                status: "Fail",
                message: "Comment dengan ID tersebut tidak ditemukan"
            })
        }

        await comment.destroy();

        return res.json({
            success: true,
            message: "Data Comment berhasil di delete",
            data: comment
        })

    } catch (error) {
        next(error)
    }
}

export const getDetailComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const comment = await Comments.findByPk(id as string);

        if (!comment) {
            return res.status(404).json({
                status: "Fail",
                message: "Comment dengan ID tersebut tidak ditemukan"
            })
        }

        return res.status(200).json({
            status: "Success",
            data: comment
        })

    } catch (error) {
        next(error);
    }
}