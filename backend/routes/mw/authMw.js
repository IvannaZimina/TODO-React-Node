const tokensCtrl = require('../../controller/tokensCtrl');

const authMw = async (req, res, next) => {
    const { accessT } = req.cookies;
    const { id } = req.body;

    const tokenCheck = await tokensCtrl.checkTokenAndDecode(accessT);
    if( id !== tokenCheck.id) {
        return res.json({ status: 'users not matches' });
    }

    next();
};

module.exports = authMw;