require('../bin/runners/db/db');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const refreshTokenModel = require('../models/refreshTokenModel');
const getPrivatekey = require('./getPrivateKey');
const getPublickey = require('./getPublickey');

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

const createRefreshToken = async (accessT) => {
    const refreshToken = uuidv4();
    const { id } = await checkTokenAndDecode(accessT);
    await refreshTokenModel.create({ tokenID: refreshToken, userId: id });
    return refreshToken;
};

const checkTokenAndDecode = async (token) => {
    const publicKey = await getPublickey();
    const result = await jwt.verify(token, publicKey);

    if(!result) {
        return { status: 'invalid token' };
    }
    return result;
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

const deleteRefreshToken = async (refreshT) => {
    const doc = await refreshTokenModel.findOne({ tokenID: refreshT });
    const token = await refreshTokenModel.deleteOne(doc);
    return {status: 'token id delete', token};
};

module.exports = {
    createAccessToken,
    createRefreshToken,
    updateTokens,
    checkTokenAndDecode,
    deleteRefreshToken
};
