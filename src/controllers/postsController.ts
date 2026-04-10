import { Posts } from "../../models/Posts.js";
import { Comments } from "../../models/Comments.js";
import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await Posts.findAll();
        res.json(posts);
    } catch (error) {
        next(error);
    }
}

export const getDetailPostWithComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const post = await Posts.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: Comments,
                    attributes: ['id', 'username', 'content', 'createdAt', 'updatedAt', 'deletedAt']
                }
            ]
        });

        if (!post) {
            return res.status(404).json({
                status: "fail",
                message: "Post dengan ID tersebut tidak ditemukan"
            })
        }

        return res.status(200).json({
            status: "Success",
            data: post
        })
    } catch (error) {
        next(error);
    }
}

export const createNewPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        payload.id = uuidv4();

        const { title, content, username } = payload;

        if (!title || !content || !username) {
            return res.status(500).json({
                status: "Fail",
                message: "Data tidak boleh kosong"
            })
        }

        const newTable = await Posts.create(payload);

        return res.status(201).json({
            status: "Resource baru berhasil dibuat.",
            data: newTable
        })

    } catch (error) {
        next(error)
    }
}

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const post = await Posts.findByPk(id as string);

        if (!post) {
            return res.status(404).json({
                status: "Fail",
                message: "Table dengan ID tersebut tidak ditemukan"
            })
        }

        await post.update({ title, content });
        return res.json({
            success: true,
            message: "Data Table berhasil di update",
            data: post
        })

    } catch (error) {
        next(error)
    }
}

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const post = await Posts.findByPk(id as string);

        if (!post) {
            return res.status(404).json({
                status: "Fail",
                message: "Table dengan ID tersebut tidak ditemukan"
            })
        }

        await post.destroy();

        return res.json({
            success: true,
            message: "Data Table berhasil di delete",
            data: post
        })

    } catch (error) {
        next(error)
    }
}