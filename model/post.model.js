const { bdd } = require('./connexion.js');
const { DataTypes } = require('sequelize');

const Post = bdd.define('post',{
  authorId:{
    type: DataTypes.INTEGER, 
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Post;