const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/withAuth");

router.get("/", withAuth, async (req, res) => {
    const post = await Post.findAll({
        where: {
            user_id: req.session.user_id,
        },
        attributes: ["id", "post_text", "title", "created_at"],
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
        .then((dbPostData) => {
            const posts = dbPostData.map((post) => post.get({ plain: true }));
            console.log(posts);
            res.render("dashboard", { posts, loggedIn: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/edit/:id", withAuth, async (req, res) => {
    const post = await Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ["id", "post_text", "title", "created_at"],
        include: [
            {
                model: User,
                attributes: ["username"],
            },
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"],
                },
            },
        ],
    })
        .then((dbPostData) => {
            const post = dbPostData.get({ plain: true });
            res.render("editPost", { post, loggedIn: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/newPost", (req, res) => {
    res.render("newPost");
});

module.exports = router;

