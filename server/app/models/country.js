module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define("countries", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        underscored: true
    });
    return Country;
};