import express, {Request, Response, NextFunction} from 'express';
import { VandorLogin, GetVandorProfile, updateVandorProfile, updateVandorService} from '../controllers';
 import {Authenticate } from '../middlewares/CommonAuth';

const router = express.Router();

router.post('/login', VandorLogin);
router.use(Authenticate);

router.get('/profile', GetVandorProfile);
router.patch('/profile', updateVandorProfile);
router.patch('/service', updateVandorService);

router.get('/', (req:Request, res:Response, next:NextFunction) => {
  res.json({
    message: "Hello from Vandor"
  })
})

export { router as VandorRoute};