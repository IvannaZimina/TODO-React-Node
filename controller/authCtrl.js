require('../bin/runners/db/db');

const userModel = require('../models/userModel');
const tokensCtrl = require('./tokensCtrl');

const createUser = async (data) => {
    const doc = await userModel.create(data);
    return doc;
};

const signOn = async (data) => {
    const doc = await userModel.findOne({ 'login': data.login });
    if(!doc) {
        const payload = {
            login: data.login,
            email: data.email,
            role: 'admin',
            pwdUser: data.password
        };
        const newUser = await createUser(payload)
        return {status: `New user ${newUser.login} added`};
    };

    return { status: 'ok', payload: doc.id };
};

const login = async (data) => {
    const doc = await userModel.findOne({ 'login': data.login });
    if(!doc) {
        return {status: 'client not declare'};
    };

    const check = await doc.checkPwd(data.password);
    if(!check) {
        return { status: 'Failed checking passwords' };
    };

    const accessT = await tokensCtrl.createAccessToken({id: doc.id, login: doc.login, role: doc.role });
    const refreshT = await tokensCtrl.createRefreshToken( accessT );

    const profile = {
        id: doc.id,
        login: doc.login,
        role: doc.role,
        avatar: doc.avatar,
        email: doc.email,
        refreshT: refreshT,
        userName: doc.userName
    };

    return { status: 'ok', payload: { profile, accessT }};
}

module.exports = {
    signOn,
    login
};
