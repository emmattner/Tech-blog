const User = require("./");
const Post = require("./posts");
const Comment = require("./comments");

// allows users to make many posts
User.hasMany(Post, {
    foreignKey: "user_id",
});

//post can only belong to a single user
Post.belongsTo(User, {
    foreignKey: "user_id",
});

// a comment can only belong to one user
Comment.belongsTo(User, {
    foreignKey: "user_id",
});

// a post can only belong to one user
Comment.belongsTo(Post, {
    foreignKey: "post_id",
});

// allows users to make many comments
User.hasMany(Comment, {
    foreignKey: "user_id",
});

// users can make many posts
Post.hasMany(Comment, {
    foreignKey: "post_id",
});

module.exports = { User, Post, Comment };
