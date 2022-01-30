const tokensCtrl = require('../../controller/tokensCtrl');

module.exports = function (req, res, next) {
    const { accessT } = req.cookies;
    const { id } = req.body;

    const tokenCheck = tokensCtrl.checkTokenAndDecode(accessT);
    if( id !== tokenCheck.id) {
        return res.json({ status: 'users not matches' });
    };

    next();
}