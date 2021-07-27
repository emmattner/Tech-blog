const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/withAuth");

router.get("/", async (req, res) => {
    const user = await User.findAll({
        attributes: { exclude: ["[password"] },
    })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});ß