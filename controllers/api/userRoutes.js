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

//Logout
router.post("/logout", withAuth, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

//Allows Update on user
router.put("/:id", withAuth, async (req, res) => {
    const user = awaitUser
        .update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id,
            },
        })
        .then((dbUserData) => {
            if (!dbUserData[0]) {
                res
                    .status(404)
                    .json({ message: "Incorrect user id, please try again" });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Delete the user
router.delete("/:id", withAuth, async (req, res) => {
    const user = await User.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbUserData) => {
            if (!dbUserData) {
                res
                    .status(404)
                    .json({ message: "Incorrect user id, please try again" });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//displays account client side
router.get("/dashboard", async (req, res) => {
    const user = await User.findOne({
        where: { email: req.body.email },
        attributes: { exclude: ["password"] },
    })
        .then((dbUserData) => {
            if (!dbUserData) {
                res
                    .status(404)
                    .json({ message: "Incorrect user id, please try again" });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;