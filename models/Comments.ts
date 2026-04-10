import { Table, Column, Model, DataType, PrimaryKey, BelongsTo, CreatedAt, UpdatedAt, DeletedAt, HasMany } from 'sequelize-typescript';
import { Posts } from './Posts.js';

@Table({
    tableName: 'Comments',
    timestamps: true,
    paranoid: true,
})
export class Comments extends Model {
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
    content!: string;

    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    postId!: string;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;

    @BelongsTo(() => Posts, 'postId')
    post!: Posts;
}