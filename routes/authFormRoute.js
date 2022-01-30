const router = require('express').Router();
const authCtrl = require('../controller/authCtrl');
const tokensCtrl = require('../controller/tokensCtrl');

router.post('/signOn', async (req, res) => {
    try {
        const data = req.body;
        const doc = await authCtrl.signOn(data);
        res.json({status: 'success', uid: doc.id });
    } catch (err) {
        res.json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const data = req.body;
        const login = await authCtrl.login(data);
        // res.setHeader('Authorization', `Bearer: ${login.payload.accessT}`, {httpOnly: true});
        res.cookie('accessT', login.payload.accessT, {httpOnly: true});
        res.json({ status: 'ok', login });
    } catch (err) {
        res.json(err);
    }
});

router.post('/logout', async (req, res) => {
    try {
        const {refreshT} = req.body;
        const deleteRefreshToken = await tokensCtrl.deleteRefreshToken(refreshT);

        if (deleteRefreshToken.status === 'token id delete') {
            res.clearCookie('accessT');
        };

        res.json({ status: 'Logout successful' });
    } catch (err) {
        res.json(err);
    }

});


module.exports = router;