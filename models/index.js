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
