const router = require('express').Router();
const upload = require('multer')();

const validateMw = require('./mw/validateMw');
const authMw = require('./mw/authMw');
const { uploadsArray } = require('../controller/uploadMany');
const taskCtrl = require('../controller/taskCtrl');
const taskSchema = require('./schemas/taskSchema.json');

router.post('/', authMw);

router.post('/', (req, res) => {
    res.json({ status: 'users matches'});
});

router.post('/createTask', uploadsArray, async (req, res) => {
    const data = req.body;
    const files = req.files;
    const newTask = await taskCtrl.createTask(data, files);
    console.log(newTask)
    res.json({ status: 'ok',  newTask});
});

router.get('/getTask', async (req, res) => {
});

router.get('/getTaskList', async (req, res) => {
    const taskList = await taskCtrl.getTaskList();
    res.json({ status: 'task list ok', taskList});
});

//========FILES=======???????==========DATAS======//
router.put('/updateTask', uploadsArray, async (req, res) => {

});
//========FILES=======???????==========DATAS======//


router.delete('/deleteTask', async (req, res) => {

});


module.exports = router;