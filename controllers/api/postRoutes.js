
const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//this will render all the posts
router.get("/", async (req, res) => {
    console.log("======================");

    const postData = await Post.findAll({
        attributes: ["id", "post_text", "title", "created_at"],
        // displays posts from most recent
        order: [["created_at", "DESC"]],
        // JOIN to the User table
        include: [
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"],
                },
            },
            {
                model: User,
                attributes: ["username"],
            },
        ],
    })
        .then((postData) => res.json(postData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});