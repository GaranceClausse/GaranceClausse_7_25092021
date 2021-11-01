const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});
const User = require('./userModel');
const Post = require('./postModel');

// creation model Comment
const Reply = sequelize.define('Reply', {
    // definition des attributs du model
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },

});

// `sequelize.define` also returns the model

//creation des foreign keys
User.hasOne(Reply, {
    onDelete: 'CASCADE'
});
Reply.belongsTo(User);

Post.hasOne(Reply, {
    onDelete: 'CASCADE'
});
Reply.belongsTo(Post);

// crée la table si elle n'existe pas
Reply.sync();

module.exports = sequelize.model('Reply', Reply);