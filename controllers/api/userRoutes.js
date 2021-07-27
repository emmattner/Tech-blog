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

//Log in and to verify user
router.post("/login", async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email,
        },
    }).then((dbUserData) => {
        if (!dbUserData) {
            res
                .status(400)
                .json({ message: "Incorrect email or password, please try again" });
            return;
        }
        // ValidPassword verifies user password
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: "Incorrect email or password, please try again" });
            return;
        }
        req.session.save(() => {
            // user data stored during session
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: "You are now logged in!" });
        });
    });
});
