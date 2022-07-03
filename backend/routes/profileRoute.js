const router = require('express').Router();
const upload = require('multer')();
const validateMw = require('./mw/validateMw');
const authMw = require('./mw/authMw');

const profileCtrl = require('../controller/profileCtrl');
const { uploadsSingle } = require('../controller/uploadSingle');

router.post('/', authMw);

router.post('/', (req, res) => {
    res.json({ status: 'users matches'});
})

router.post('/avatar', uploadsSingle, async (req, res) => {
    const data = req.file;
    const { uid } = req.body;
    const avatar = await profileCtrl.avatar(data, uid);
    res.json({ status: 'file uploaded', avatar });
})

router.put('/updateUserName', upload.none(),
validateMw({
    type: 'object',
    properties: {
        userName: { type: "string", minLength: 1, maxLength: 100},
        uid: { type: "string"},
    },
    required: ['userName', 'uid'],
    additionalProperties: false
}), async (req, res) => {
    try {
        const data = req.body;
        const userName = await profileCtrl.updateUserName(data.userName, data.uid);
        res.json({status: 'success updating userName', userName});
    } catch (err) {
        res.json(err);
    }
});

router.put('/updateUserEmail', upload.none(),
validateMw({
    type: 'object',
    properties: {
        email: { type: "string", minLength: 1, maxLength: 100},
        uid: { type: "string"},
    },
    required: ['email', 'uid'],
    additionalProperties: false
}), async (req, res) => {
    try {
        const data = req.body;
        const userEmail = await profileCtrl.updateEmail(data.email, data.uid);
        res.json({status: 'success updating email', userEmail });
    } catch (err) {
        res.json(err);
    }
});

router.get('/managerList', async (req, res) => {
    const managers = await profileCtrl.getPerformerList();
    res.json({ status: 'managers list ok', managers });
})

router.delete('/deleteUser');

module.exports = router;