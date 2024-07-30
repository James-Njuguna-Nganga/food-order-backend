import express, { Request, Response, NextFunction } from 'express';
import { CreateVandor, GetVandors, GetVandorByID, GetTransactions, GetTransactionById, VerifyDeliveryUser, GetDeliveryUsers } from '../controllers';

const router = express.Router();


router.post('/vandor', CreateVandor)
router.get('/vandors', GetVandors)
router.get('/vandor:id', GetVandorByID)

router.get('/transactions', GetTransactions);
router.get('/transaction/:id', GetTransactionById);

router.put('/delivery/verify', VerifyDeliveryUser)
router.get('/delivery/users', GetDeliveryUsers);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "hello from Admin"
  })
})

export { router as AdminRoute };