import express, {Request, Response, NextFunction} from 'express';
import { GetFoodAvailability, GetFoodIn30Min, GetTopRestaurants, ResturantById, SearchFoods, GetAvailableOffers } from '../controllers';

const router = express.Router();

/**-----------Food Availability-------- */
router.get('/:pincode', GetFoodAvailability);

/**-----------Top Resturants-------- */
router.get('/top-restaurants/:pincode', GetTopRestaurants);



/**-----------Food Available in 30 Minutes-------- */
router.get('/foods-in-30-min/:pincode', GetFoodIn30Min);



/**-----------Search Foods-------- */
router.get('/search/:pincode', SearchFoods);


/**-----------Find Offers-------- */
router.get("/offers/:pincode", GetAvailableOffers)


/**-----------Find Resturant By Id-------- */
router.get('/restaurant/:id', ResturantById);


export {router as ShoppingRoute};