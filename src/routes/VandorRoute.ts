import express, {Request, Response, NextFunction} from 'express';
import { VandorLogin, GetVandorProfile, updateVandorProfile, updateVandorService, UpdateVandorCoverImage} from '../controllers';
 import {Authenticate } from '../middlewares/CommonAuth';
 import { AddFood, GetFoods } from '../controllers';
 import multer from 'multer';
 import fs from 'fs';
import path from 'path';

const router = express.Router();

// configure multer
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {

    const imagesDir = path.join(__dirname, '..', 'images');

    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    cb(null, imagesDir);
    
  },

  filename: function (req, file, cb) {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    cb(null, `${timestamp}_${file.originalname}`);
  }

});

const images = multer({storage: imageStorage}).array('images', 8)

router.post('/login', VandorLogin);
router.use(Authenticate);

router.get('/profile', GetVandorProfile);
router.patch('/profile', updateVandorProfile);
router.patch('/service', updateVandorService);
router.patch('/coverimage',images, UpdateVandorCoverImage);


router.post("/food", images, AddFood);
router.get("/foods", GetFoods);

router.get('/', (req:Request, res:Response, next:NextFunction) => {
  res.json({
    message: "Hello from Vandor"
  })
})

export { router as VandorRoute};