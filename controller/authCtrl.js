require('../bin/runners/db/db');
const { resolve } = require('path');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const userModel = require('../models/userModel');
const refreshTokenModel = require('../models/refreshTokenModel');
const getPrivatekey = require('./getPrivateKey');
const getPublickey = require('./getPublickey');

const createUser = async (data) => {
    const doc = await userModel.create(data);
    return doc;
};

const createAccessToken = async (payload) => {
    const privateKey = await getPrivatekey();
    
    {
        const now = moment();
        if (payload.exp && moment(payload.exp) < now) {
            delete (payload.exp);
        }
        if (!payload.exp) {
            const exp = Number(now.add(1, 'mm')); 
            payload.exp = exp;
        }
    }
    
    const token = jwt.sign(
        payload,
        privateKey,
        { algorithm: 'RS256'}
    );
    return token;
};

const checkTokenAndDecode = async (token) => {
    const publicKey = await getPublickey();
    const result = await jwt.verify(token, publicKey);

    if(!result) {
        return { status: 'invalid token' };
    }
    return result;
};

const createRefreshToken = async (accessT) => {
    const refreshToken = uuidv4();
    const { id } = await checkTokenAndDecode(accessT);
    await refreshTokenModel.create({ tokenID: refreshToken, userId: id });
    return refreshToken;
};

const updateTokens = async (accessT, refreshT) => {

    const result = await checkTokenAndDecode(accessT);

    if (!result) {
        return { status: 'invalid acsecctoken' };
    }
    delete(result.exp);

    const doc = await refreshTokenModel.findOne({
        'tokenID': refreshT,
        'userId': result.id
    });
    doc.remove();

    if(!doc) {
        return { status: 'refreshToken non declare' };
    };

    const profile = {
        status: 'ok',
        id: result.id,
        login: result.login,
        role: result.role
    };

    const accessToken = await createAccessToken({ id: profile.id, login: profile.login, role: profile.role  });
    const refreshToken = await createRefreshToken( accessToken );

    return { status: 'ok', payload: { profile, accessToken, refreshToken }};
};

const findUserById = async (id) => {
    const doc = await userModel.findOne({ _id: id });
    const payload = {
        id: doc._id,
        email: doc.email,
        role: doc.role,
        userName: doc.userName,
        avatar: doc.avatar
    }
    return payload;
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

    const accessToken = await createAccessToken({id: doc.id, login: doc.login, role: doc.role });
    const refreshToken = await createRefreshToken( accessToken );

    return { status: 'ok', payload: { doc, accessToken, refreshToken }};
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

    const accessT = await createAccessToken({id: doc.id, login: doc.login, role: doc.role });
    const refreshT = await createRefreshToken( accessT );

    const profile = {
        id: doc.id,
        login: doc.login,
        role: doc.role,
        accessT: accessT,
        refreshT: refreshT
    }

    return { status: 'ok', payload: profile };
}

// function to apload tha separate file
const uploadAvatar = async (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file was uploaded' })
    };

    const file = req.files.file;    
    const path = resolve(`public/images/`);  // check the path !!!

    await file.mv(`${path}/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({ fileName: file.name, filePath: `public/images/${file.name}` })
    });
};


module.exports = {
    signOn,
    login,
    findUserById,
    updateTokens,
    checkTokenAndDecode,
    uploadAvatar
};







// // function to save avatar into User
// const saveAvatarToUser = async (file, id) => {
//     try {
//         const fileName = uuidv4() + '.jpg';
//         const filePath = resolve(`public/images/${fileName}`);  // check the path !!!
//         file.mv(filePath);

//         const user = await userModel.findOneAndUpdate(
//             { id: id},
//             { id: id, avatar: filePath }
//         );

//         return({status: 'fileuploaded', uid: user.id});
//     } catch (err) {
//         console.lof(err);
//     }
// };
