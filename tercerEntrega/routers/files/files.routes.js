const express = require('express');
const multer = require('multer');
const { HTTP_STATUS } = require('../../constants/api.constants');
const { HttpError } = require('../../utils/api.utils');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) =>{
        const ext = file.mimetype.split('/')[1];
        cb(null, `${file.fieldname}-${DAte.now()}.${ext}`);
    }    

});
const upload = multer({storage});

router.post('/file', upload.single('avatar'), (req, res) => {
    const file = req.file;
    if (!file){
        const message = 'debe cargar archivo';
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
});

module.exports = router;