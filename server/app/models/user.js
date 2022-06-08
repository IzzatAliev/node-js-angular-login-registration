module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING
        },
        login: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        birthDate: {
            type: Sequelize.DATEONLY
        },
        country: {
            type: Sequelize.STRING
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        underscored: true})
    return User;
};
