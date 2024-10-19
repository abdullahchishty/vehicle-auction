const multer = require('multer');
const path = require('path');
const fs = require('fs');

const commonStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'src/uploads/static/vehicle';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath); 
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploadFiles = multer({
    storage: commonStorage,
    fileFilter: function (req, file, cb) {
        const imageTypes = /jpeg|jpg|png/;
        const pdfType = /pdf/;
        const mimetype = file.mimetype;
        const extname = path.extname(file.originalname).toLowerCase();
        if (file.fieldname === 'IMAGES') {
            if (imageTypes.test(mimetype) && imageTypes.test(extname)) {
                return cb(null, true);
            } else {
                return cb(new Error('Only .jpeg, .jpg, and .png files are allowed for images!'), false);
            }
        } else if (file.fieldname === 'AUCTION_SHEET') {
            if (pdfType.test(mimetype) && pdfType.test(extname)) {
                return cb(null, true);
            } else {
                return cb(new Error('Only .pdf files are allowed for PDFs!'), false);
            }
        } else {
            return cb(new Error('Invalid file field name!'), false);
        }
    }
});

module.exports = uploadFiles;
