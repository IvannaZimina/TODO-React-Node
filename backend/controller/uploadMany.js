const path = require('path');
const multer  = require('multer');

const tasksUploads = path.resolve('public/tasks');

const storageTasks = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, tasksUploads)
    },
    filename(req, file, cb) {
        cb(null, file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" ||
        file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.mimetype === "application/msword" || file.mimetype === "application/pdf" || file.mimetype === "application/zip" ||
        file.mimetype === "application/vnd.ms-excel" || file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.mimetype === "application/xml" || file.mimetype === "text/plain" || file.mimetype === "text/csv" ||
        file.mimetype === "video/mp4" || file.mimetype === "video/mpeg" || file.mimetype === "video/x-msvideo"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    };
};

const limits = {fileSize: 1000000000};

const taskUpload = multer({ storage: storageTasks, limits, fileFilter: fileFilter});
const uploadsArray = taskUpload.array('uploadsArray', 10);

module.exports = {
    uploadsArray
};
