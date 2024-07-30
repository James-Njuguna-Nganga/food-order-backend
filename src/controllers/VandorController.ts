import { Request, Response, NextFunction, response } from "express";
import { GenerateSignature, ValidatePassword } from "../utility";
import { FindVandor } from "./AdminController";
import { CreateOfferInputs, EditVandorInputs, VandorLoginInputs } from "../dto";
import { Food } from "../models/Food";
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


