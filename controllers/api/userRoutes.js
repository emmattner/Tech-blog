const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/withAuth");

//Allows users to access users
router.get("/", async (req, res) => {
    const user = await User.findAll({
        attributes: { exclude: ["[password"] },
    })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Creates a new user
router.post("/", async (req, res) => {
    const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
        // UserData stores user login during session
        .then((dbUserData) => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        });
});
