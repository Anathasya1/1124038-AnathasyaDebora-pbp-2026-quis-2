module.exports = {
    up: async (queryInterface, Sequelize) => {
        
        await queryInterface.createTable('Posts', {
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

            title: {
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

    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Posts');
    }
}