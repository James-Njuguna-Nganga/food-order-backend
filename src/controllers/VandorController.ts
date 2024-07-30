import { Request, Response, NextFunction, response } from "express";
import { GenerateSignature, ValidatePassword } from "../utility";
import { FindVandor } from "./AdminController";
import { CreateOfferInputs, EditVandorInputs, VandorLoginInputs } from "../dto";
import { Food,Order,Offer } from "../models";
import { CreateFoodInputs } from "../dto/Food.dto";



export const VandorLogin = async (
  req: Request,res: Response,
  next: NextFunction
) => {
  const { email, password } = <VandorLoginInputs>req.body;

  const existingVandor = await FindVandor("", email);

  if (existingVandor !== null) {
    //validation and access
    const Validation = await ValidatePassword(
      password,
      existingVandor.password
    )

    if (Validation) {
      const signature = GenerateSignature({
        _id: existingVandor.id,
        email: existingVandor.email,
        foodTypes: existingVandor.foodType,
        name: existingVandor.name,
      });
      return res.json(signature);
    } else {
      return res.json({ message: "password is not valid" });
    }
  }

  return res.json({ Message: "Login credential not valid" });
};

// Get Vandor profile
export const GetVandorProfile = async (
  req: Request,res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user) {
    const existingVandor = await FindVandor(user._id);

    return res.json(existingVandor);
  }

  return res.json({ message: "vandor information not found" });
};

export const updateVandorProfile = async (
  req: Request,res: Response,
  next: NextFunction
) => {
  const { foodTypes, name, address, phone } = <EditVandorInputs>req.body;

  const user = req.user;

  if (user) {
    const existingVandor = await FindVandor(user._id);

    if (existingVandor !== null) {
      existingVandor.name = name;
      existingVandor.address = address;
      existingVandor.phone = phone;
      existingVandor.foodType = foodTypes;

      const savedResult = await existingVandor.save();
      return res.json(savedResult);
    }

    return res.json(existingVandor);
  }

  return res.json({ message: "vandor information Not found" });
};
//update vandor service
export const updateVandorService = async (
  req: Request,res: Response,
  next: NextFunction
) => {
  const user = req.user;

  const {lat, lng} = req.body;

  if (user) {
    const existingVandor = await FindVandor(user._id);

    if (existingVandor !== null) {

      existingVandor.serviceAvailable = !existingVandor.serviceAvailable;

      if(lat && lng){
        existingVandor.lat = lat;
        existingVandor.lng = lng;
      }

      const savedResult = await existingVandor.serviceAvailable;
      return res.json(savedResult);

    }

    return res.json(existingVandor);
  }

  return res.json({ message: "Vandor information Not found" });
};
// update  coverimage
export const UpdateVandorCoverImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user) {
    const vandor = await FindVandor(user._id);

    if (vandor !== null) {
      const files = req.files as [Express.Multer.File];

      const images = files.map((file: Express.Multer.File) => file.filename);

      vandor.coverImages.push(...images);

      const result = await vandor.save();

      return res.json(result);
    }
  }

  return res.json({ message: "Something went wrong with add food" });
};


export const AddFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user) {
    const { name, description, category, foodType, readyTime, price } = <
      CreateFoodInputs
    >req.body;

    const vandor = await FindVandor(user._id);

    if (vandor !== null) {
      const files = req.files as [Express.Multer.File];

      const images = files.map((file: Express.Multer.File) => file.filename);

      const createdFood = await Food.create({
        vandorId: vandor._id,
        name: name,
        description: description,
        category: category,
        foodType: foodType,
        images: images,
        readyTime: readyTime,
        price: price,
        rating: 0,
      });

      vandor.foods.push(createdFood);
      const result = await vandor.save();

      return res.json(result);
    }
  }

  return res.json({ message: "something went wrong with add food" });
};


export const GetFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user) {
    const foods = await Food.find({ vandorId: user._id });

    if (foods !== null) {
      return res.json(foods);
    }
  }

  return res.json({ message: "foods information Not found" });
};

// current orders
export const GetCurrentOrders = async (
  req: Request,res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user) {
    const orders = await Order.find({ VandorId: user._id }).populate(
      "items.food"
    );

    if (orders != null) {
      return res.status(200).json(orders);
    }
  }

  return res.json({ message: "order not found" });
};

//  single order details by id
export const GetOrderDetails = async (
  req: Request,res: Response,
  next: NextFunction
) => {
  const orderId = req.params.id;

  if (orderId) {
    const order = await Order.findById(orderId).populate("items.food");

    if (order != null) {
      return res.status(200).json(order);
    }
  }

  return res.json({ message: "order not found" });
};

// Process  order
export const ProcessOrder = async (
  req: Request,res: Response,
  next: NextFunction
) => {
  const orderId = req.params.id;

  const { status, remarks, time } = req.body; // vandor/customer
  if (orderId) {
    const order = await Order.findById(orderId).populate("food");

    order.orderStatus = status;
    order.remarks = remarks;

    if (time) {
      order.readyTime = time;
    }

    const orderResult = await order.save();
    if (orderResult !== null) {
      return res.status(200).json(orderResult);
    }
  }

  return res.json({ message: "unable to process order" });
};

export const GetOffers = async (
  req: Request,res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user) {
    let currentOffers = Array();

    const offers = await Offer.find().populate("vandors");

    if (offers) {
      offers.map((item) => {
        if (item.vandors) {
          item.vandors.map((vandor) => {
            if (vandor._id.toString() === user._id) {
              currentOffers.push(item);
            }
          });
        }

        if (item.offerType === "Generic") {
          currentOffers.push(item);
        }
      });
    }

    return res.json(currentOffers);
  }

  return res.json({ message: "offers unavailable" });
};

export const AddOffer = async (
  req: Request,res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user) {
    const {
      title,description,
      offerType,
      offerAmount,
      pincode,
      promocode,
      promoType,
      startValidity,
      endValidity,
      bank,
      bins,
      minValue,
      isActive,
      
    } = <CreateOfferInputs>req.body;

    const vandor = await FindVandor(user._id);

    if (vandor) {
      const offer = await Offer.create({
        title,
        description,
        offerType,
        offerAmount,
        pincode,
        promocode,
        promoType,
        startValidity,
        endValidity,
        bank,
        bins,
        minValue,
        isActive,
        vandors: [vandor],
      });

      console.log(offer);

      res.status(200).json(offer);
    }
  }

  return res.json({ "message": "unable to add offer" });
};

export const EditOffer = async (
  req: Request,res: Response,
  next: NextFunction
) => {
  const user = req.user;

  const offerId = req.params.id;

  if (user) {
    const {
      title,
      description,
      offerType,
      offerAmount,
      pincode,
      promocode,
      promoType,
      startValidity,
      endValidity,
      bank,
      bins,
      minValue,
      isActive,
    } = <CreateOfferInputs>req.body;

    const currentOffer = await Offer.findById(offerId);

    if (currentOffer) {
      const vandor = await FindVandor(user._id);

      if (vandor) {
       currentOffer.title = title,
       currentOffer.description = description,
       currentOffer.offerType = offerType,
       currentOffer.offerAmount = offerAmount,
       currentOffer.pincode = pincode,
       currentOffer.promocode = promocode,
       currentOffer.promoType = promoType,
       currentOffer.startValidity = startValidity,
       currentOffer.endValidity = endValidity,
       currentOffer.bank = bank,
       currentOffer.bins = bins,
       currentOffer.isActive = isActive,
       currentOffer.minValue = minValue

       const result = await currentOffer.save();

        res.status(200).json(result);
      }
    }
  }

  return res.json({ "message": "unable to add offer" });
};


