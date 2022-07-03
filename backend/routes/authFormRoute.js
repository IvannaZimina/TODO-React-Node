const router = require("express").Router();
const authCtrl = require("../controller/authCtrl");
const tokensCtrl = require("../controller/tokensCtrl");

const validateMw = require("./mw/validateMw");
const userSchema = require("./schemas/userSchema.json");

router.post("/signOn", async (req, res) => {
    try {
        const data = req.body;
        const doc = await authCtrl.signOn(data);
        res.json({ status: "success", uid: doc.id });
    } catch (err) {
        res.json(err);
    }
});

router.post(
    "/login",
    validateMw({
        type: "object",
        properties: {
            login: { type: "string", minLength: 1, maxLength: 100 },
            password: { type: "string", minLength: 6 },
        },
        required: ["login", "password"],
        additionalProperties: false,
    }),
    async (req, res) => {
        try {
            const data = req.body;
            const login = await authCtrl.login(data);
            res.cookie("accessT", login.payload.accessT, { httpOnly: true });
            res.json({ status: "ok", login: login.payload.profile });
        } catch (err) {
            res.json(err);
        }
    }
);

router.post("/logout", async (req, res) => {
    try {
        const { refreshT } = req.body;
        const deleteRefreshToken = await tokensCtrl.deleteRefreshToken(
            refreshT
        );

        if (deleteRefreshToken.status === "token id delete") {
            res.clearCookie("accessT");
        }

        res.json({ status: "Logout successful" });
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
