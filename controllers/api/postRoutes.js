
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

// this allows users to create a post
router.post("/", withAuth, async (req, res) => {
    const newPost = await Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id,
    })
        .then((newPost) => res.json(newPost))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});