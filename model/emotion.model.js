const { DataTypes } = require('sequelize');
const { bdd } = require('./connexion');
const Post = require('./post.model.js');
const User = require('./user.model.js');

const Emotion = bdd.define('Emotion', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Post,
            key: 'id'
        },
    },
    type: {
        type: DataTypes.ENUM('like', 'love', 'thumbup'),
        allowNull: false
    }
});

Emotion.belongsTo(Post, { foreignKey: 'postId', onDelete: 'CASCADE' });
Emotion.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Post.hasMany(Emotion, { foreignKey: 'postId', onDelete: 'CASCADE' });
User.hasMany(Emotion, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = Emotion;