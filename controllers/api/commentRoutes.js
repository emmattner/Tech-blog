const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/withAuth");

router.get("/", async (req, res) => {
    const comment = await Comment.findAll({})
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// This will allow users to create a new comment
router.post("/", withAuth, async (req, res) => {
    const comment = await Comment.create({
        post_id: req.body.post_id,
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
    })
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// This will update comments
router.put("/", withAuth, async (req, res) => {
    const comment = await Comment.create(
        {
            post_id: req.body.post_id,
            comment_text: req.body.comment_text,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

