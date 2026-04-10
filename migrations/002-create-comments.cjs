module.exports = {
    up: async (queryInterface, Sequelize) => {
        
        await queryInterface.createTable('Comments', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },

            username: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            content: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },

            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },

            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            }
        })

        await queryInterface.addColumn('Comments', 'postId', {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            references: { 
                model: 'Posts',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })

    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Comments', 'postId')
        await queryInterface.dropTable('Comments');
    }
}