import express, { Request, Response, NextFunction } from 'express';
import { GetFoodAvailability, GetFoodIn30Min, GetTopRestaurants, ResturantById, SearchFoods, GetAvailableOffers } from '../controllers';

const router = express.Router();

router.get('/:pincode', GetFoodAvailability);

router.get('/top-restaurants/:pincode', GetTopRestaurants);


router.get('/foods-in-30-min/:pincode', GetFoodIn30Min);

router.get('/search/:pincode', SearchFoods);

router.get("/offers/:pincode", GetAvailableOffers)

router.get('/restaurant/:id', ResturantById);


export { router as ShoppingRoute };