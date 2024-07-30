import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { Authenticate } from '../middlewares/CommonAuth';

import { VandorLogin, 
  GetVandorProfile, 
  updateVandorProfile, 
  updateVandorService, 
  UpdateVandorCoverImage, 
  GetCurrentOrders, 
  ProcessOrder, 
  GetOrderDetails, 
  AddFood, 
  GetFoods, 
  GetOffers, 
  AddOffer, 
  EditOffer } from '../controllers';


const router = express.Router();

// configure 
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

const images = multer({ storage: imageStorage }).array('images', 8)

router.post('/login', VandorLogin);
router.use(Authenticate);

router.get('/profile', GetVandorProfile);
router.patch('/profile', updateVandorProfile);
router.patch('/service', updateVandorService);
router.patch('/coverimage', images, UpdateVandorCoverImage);


router.post("/food", images, AddFood);
router.get("/foods", GetFoods);

//offers
router.get('/offers', GetOffers);
router.post('/offer', AddOffer);
router.put('/offer/:id', EditOffer);

// orders
router.get('/orders', GetCurrentOrders);
router.put('/order/:id/process', ProcessOrder);
router.get('/order/:id', GetOrderDetails);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "hello from vandor"
  })
})

export { router as VandorRoute };