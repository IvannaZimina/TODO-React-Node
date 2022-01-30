require('../bin/runners/db/db');
const userModel = require('../models/userModel');

const avatar = async (file, uid) => {
    const doc = await userModel.findOne({ _id: uid });
    if (!doc) { return { status: 'user not found' } };

    const filePath = `/avatars/${file.filename}`;
    const avatar = await userModel.findOneAndUpdate(
        { _id: uid },
        { avatar: filePath }
    );

    return avatar.avatar;
};

const updateUserName = async (userName, uid) => {
    const doc = await userModel.findOne({ _id: uid });
    if (!doc) { return { status: 'user not found' } };

    const newUserName = await userModel.findOneAndUpdate(
        { _id: uid },
        { userName: userName }
    );

    return newUserName.userName;
};

const updateEmail = async (email, uid) => {
    const doc = await userModel.findOne({ _id: uid });
    if (!doc) { return { status: 'user not found' } };

    const newUserName = await userModel.findOneAndUpdate(
        { _id: uid },
        { email: email }
    );

    return newUserName.email;
};


module.exports = {
    avatar,
    updateUserName,
    updateEmail
};

