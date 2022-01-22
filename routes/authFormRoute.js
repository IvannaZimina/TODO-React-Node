const router = require('express').Router();
const multer = require('multer');

const upload = multer({ dest: 'public/images' });
const uploadsSingle = upload.single('avatar');


const authCtrl = require('../controller/authCtrl');
// const { uploadsSingle } = require('../controller/uploadSingle');

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
        res.json({ status: 'ok', login });
    } catch (err) {
        res.json(err);
    }
});



// UPLOAD MULTER
router.post('/avatarTwo', uploadsSingle, async (req, res) => {
    const data = req.file;

    console.log('avatar: ', data);

})






router.post('/upload', authCtrl.uploadAvatar);

router.get('/getUsers');

router.get('/getUser/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const doc = await authCtrl.findUserById(id);
        res.json({status: 'success', uid: doc });
    } catch (err) {
        res.json(err);
    }
})

router.put('/updateUser', async (req, res) => {
    try {
        const data = req.body;
        console.log('updateUser: ', data);

        res.json({status: 'success update' });
    } catch (err) {
        res.json(err);
    }
});

router.delete('/deleteUser/:id');

module.exports = router;