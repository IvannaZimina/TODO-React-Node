const path = require('path');
const fs = require('fs');
const multer  = require('multer');

const avatarUploads = path.resolve('public/images');
console.log('path:', avatarUploads)

// const storageAvatar = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, avatarUploads)
//     },
//     filename(req, file, cb) {
//         cb(null, file.originalname)
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     };
// };

// const limits = {fileSize: 1000000};

// const upload = multer({ storage: storageAvatar, fileFilter: fileFilter, limits});
// const uploadsSingle = upload.single('avatar');

const upload = multer({ dest: 'public/images' });
const uploadsSingle = upload.single('avatar');


module.exports = {
    uploadsSingle
};
