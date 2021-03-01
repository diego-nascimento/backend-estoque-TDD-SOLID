import multer from 'multer';
import path from 'path';
import crypto from 'crypto'
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import dadosacesso from '../config/s3';
require('dotenv').config();


aws.config.update(dadosacesso);


const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      
      cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (error, hash) => {
        if (error) cb(error,  ' ')
        file.originalname = file.originalname.replace(/\s/g, '-')
        const name = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, name);
      });
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'loja-tdd',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (error, hash) => {
        if (error) cb(error);
        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, fileName);
      });
    },
  }),
};

export default  {
  dest: path.resolve(__dirname, '..', '..', 'uploads'),
  storage: storageTypes['local'],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req: any, file: any, callback: any) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/webp',
      'image/svg',
    ];
    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type.'));
    }
  },
};
