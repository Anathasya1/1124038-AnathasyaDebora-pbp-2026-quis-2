import { Table, Column, Model, DataType, PrimaryKey, BelongsTo, CreatedAt, UpdatedAt, DeletedAt, HasMany } from 'sequelize-typescript';
import { Comments } from "./Comments.js";

@Table({
    tableName: 'Posts',
    timestamps: true,
    paranoid: true,
})
export class Posts extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username!: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    title!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    content!: string;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;

    @HasMany(() => Comments, 'postId') 
    comments! : Comments[];
}