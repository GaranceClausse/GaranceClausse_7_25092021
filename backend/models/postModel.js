const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); 
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'    
});
const User = require('./userModel');

// creation model Post
const Post = sequelize.define('Post', {
  // definition des attributs du model
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
    },
    likes: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0
    },
    dislikes: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0
    },
    userLiked: {
        type: DataTypes.STRING,
        defaultValue: ' '
    },
    userDisliked: {
        type: DataTypes.STRING,
        defaultValue: ' '
    }
});

// `sequelize.define` also returns the model
console.log(Post === sequelize.models.Post); // true

// creation foreign key
User.hasOne(Post, {
    onDelete: 'CASCADE'
});
Post.belongsTo(User);

// crée la table si elle n'existe pas 
Post.sync();

module.exports = sequelize.model('Post', Post);