import { Response } from "express";

export const response = (
  res: Response,
  statusCode: number,
  message: String,
  data: any
) => {
  res.status(statusCode).json({
    status: statusCode,
    message: message,
    data: data,
  });
};
