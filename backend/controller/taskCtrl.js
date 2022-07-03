require('../bin/runners/db/db');
const moment = require('moment');

const taskModel = require('../models/taskModel');
const userModel = require('../models/userModel');
const answerToTaskModel = require('../models/answerToTaskModel');

const createTask = async (data, files) => {
    // console.log('createTask: ', data);
    // console.log('files: ', files);

    const dateCreateAt = moment().format('YYYY-MM-DD');

    const filesArray = [];
    files.forEach( (item) => {
        const filePath = `/tasks/${item.filename}`;
        filesArray.push(filePath);
    });

    const payloadTask = {
        title: data.title,
        description: data.description,
        priority: data.priority,
        performer: data.performer,
        dateCreateAt: dateCreateAt,
        dateDoneTo: data.dateDoneTo,
        files: filesArray
    }

    const newTask = await taskModel.create(payloadTask);

    const userTask = await userModel.findOneAndUpdate(
        { _id: data.uid },
        { $push: { tasks: newTask._id }},
    );

    return {status: 'new task created', task: newTask.id };
};

const getTaskList = async () => {
    const tasks = await taskModel.find({});

    let taskList = [];
    tasks.forEach( (item) => {
        const task = {
            id: item._id,
            title: item.title,
            performer: item.performer,
            priority: item.priority,
            dateDoneTo: item.dateDoneTo,
            updatedAt: item.updatedAt,
            statusDone: item.statusDone
        };
        taskList.push(task);
    });

    return taskList;
}

const editTask = async (data) => {

};

const deleteTask = async (data) => {

};

const createAnswerToTask = async (data) => {

};


module.exports = {
    createTask,
    getTaskList,
    editTask,
    deleteTask,
    createAnswerToTask
};