import  { Request, Response, NextFunction } from "express";
import {decrypt} from "../utils/encryption";

export default (req: Request, res: Response, next: NextFunction) => {
  req.body = decrypt(req.body.encryptedData);
  next();
};
