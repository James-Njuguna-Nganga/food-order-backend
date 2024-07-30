import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config';
import { VandorPayLoad } from '../dto/Vandor.dto';
import { AuthPayload } from '../dto/Auth.dto';
import { Request } from 'express';

export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
}

export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
}

export const ValidatePassword = async (enteredPassword: string, savedPassword: string) => {
  return await bcrypt.compare(enteredPassword, savedPassword);
}

export const GenerateSignature = (payload: AuthPayload) => {
  return jwt.sign(payload, APP_SECRET, { expiresIn: "4d" });
}

export const ValidateSignature = async (req: Request) => {
  const signature = req.get('Authorization');

  if (signature) {
    try {
      const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET) as AuthPayload;
      req.user = payload;
      return true;
    } catch (error) {
      console.error('Invalid signature:', error);
      return false;
    }
  }

  return false;
}
