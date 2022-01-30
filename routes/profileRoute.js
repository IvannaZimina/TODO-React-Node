const router = require('express').Router();
const upload = require('multer')();

const profileCtrl = require('../controller/profileCtrl');
const authMw = require('./mw/authMw');
const { uploadsSingle } = require('../controller/uploadSingle');

router.post('/', authMw);

router.post('/avatar', uploadsSingle, async (req, res) => {
    const data = req.file;
    const { uid } = req.body;
    const avatar = await profileCtrl.avatar(data, uid);
    res.json({ status: 'file uploaded', avatar });
})

router.put('/updateUserName', upload.none(), async (req, res) => {
    try {
        const data = req.body;
        const userName = await profileCtrl.updateUserName(data.userName, data.uid);
        res.json({status: 'success upddating userName', userName});
    } catch (err) {
        res.json(err);
    }
});

router.put('/updateUserEmail', upload.none(), async (req, res) => {
    try {
        const data = req.body;
        const userEmail = await profileCtrl.updateEmail(data.email, data.uid);
        res.json({status: 'success upddating email', userEmail });
    } catch (err) {
        res.json(err);
    }
});


router.delete('/deleteUser');

module.exports = router;