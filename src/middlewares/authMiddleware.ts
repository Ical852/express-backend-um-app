import { Request, Response, NextFunction } from "express";
import ExpiredToken from "../models/expiredToken";
import jwt from "jsonwebtoken";
import { jwtKey } from "../utils/jwtKey";
import { response } from "../utils/response";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return response(res, 401, "Unauthorized", null);
  }

  try {
    const isExpired = await ExpiredToken.findOne({ where: { token } });
    if (isExpired) {
      return response(res, 500, "Token Expired", null);
    }

    const decoded = jwt.verify(token, jwtKey);
    (req as any).user = decoded;
    (req as any).token = token;
    next();
  } catch (ex) {
    return response(res, 400, "Invalid token", null);
  }
};
