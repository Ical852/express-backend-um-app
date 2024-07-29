import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/admin";
import ExpiredToken from "../models/expiredToken";
import { response } from "../utils/response";
import { jwtKey } from "../utils/jwtKey";

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, birthDate, gender, password } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      firstName,
      lastName,
      email,
      birthDate,
      gender,
      password: hashedPassword,
    });
    const { password: _password, ...adminWithoutPassword } = admin.toJSON();
    return response(res, 201, "Success register admin", adminWithoutPassword);
  } catch (error: any) {
    return response(res, 500, "Failed to create admin", null);
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return response(res, 404, "Admin not found", null);
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return response(res, 401, "Invalid password", null);
    }
    const token = jwt.sign({ id: admin.id }, jwtKey, {
      expiresIn: "1h",
    });
    return response(res, 201, "Login success", token);
  } catch (error) {
    return response(res, 500, "Login Failed", null);
  }
};

export const fetchAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await Admin.findByPk((req as any).user.id);
    if (!admin) {
      return response(res, 500, "Admin not found", null);
    }
    return response(res, 200, "Success to fetch admin", admin);
  } catch (error) {
    return response(res, 500, "Failed to fetch admins", null);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, birthDate, gender } = req.body;
    const admin = await Admin.findByPk((req as any).user.id);
    if (!admin) {
      return response(res, 500, "Admin not found", null);
    }
    await admin.update({ firstName, lastName, birthDate, gender });
    return response(res, 200, "Success to update profile", admin);
  } catch (error) {
    return response(res, 500, "Failed to update profile", null);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = (req as any).token;
    await ExpiredToken.create({ token });
    return response(res, 200, "Logout success", null);
  } catch (error) {
    return response(res, 500, "Logout Failed", null);
  }
};

export const getAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await Admin.findAll();
    return response(res, 200, "Success to get admin data", admins);
  } catch (error) {
    return response(res, 500, "Failed to get admin data", null);
  }
};

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, birthDate, gender } = req.body;
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return response(res, 404, "Admin not found", null);
    }
    await admin.update({ firstName, lastName, birthDate, gender });
    return response(res, 200, "Success to update admin data", admin);
  } catch (error) {
    return response(res, 500, "Failed to update admin data", null);
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return response(res, 404, "Admin not found", null);
    }
    await admin.destroy();
    return response(res, 200, "Success to delete admin", null);
  } catch (error) {
    return response(res, 500, "Failed to delete admin", null);
  }
};
