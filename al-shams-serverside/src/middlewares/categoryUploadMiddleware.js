const multer = require('multer');
const path = require('path');
const fs = require('fs');

const categoryStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'src/uploads/static/icon';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath); 
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const categoryUpload = multer({
    storage: categoryStorage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/svg+xml') {
            cb(null, true);
        } else {
            cb(new Error('Only .svg files are allowed!'), false);
        }
    }
});

module.exports = categoryUpload;
