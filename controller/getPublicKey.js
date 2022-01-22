const fs = require('fs-extra');
const path = require('path');

const keyPath = path.join(__dirname, '../keys/public.key');
let publicKey = null;

const getPublicKey = async () => {
    if(!publicKey) {
        publicKey = await fs.readFile(keyPath, 'utf-8');
    }
    return publicKey;
};

module.exports = getPublicKey;