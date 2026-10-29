import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sign = (e) =>
  jwt.sign({ id: e.id, email: e.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });

const publicEmployee = (e) => ({ id: e.id, name: e.name, email: e.email });

// Resgister a new employee
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({
          success: false,
          message: "name, email and password are required",
        });
    if (!emailRe.test(email))
      return res.status(400).json({ success: false, message: "Invalid email" });
    if (password.length < 6)
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be at least 6 characters",
        });

    const normalized = email.trim().toLowerCase();
    const existing = await prisma.employee.findUnique({
      where: { email: normalized },
    });
    if (existing)
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });

    const employee = await prisma.employee.create({
      data: {
        name: name.trim(),
        email: normalized,
        password: await bcrypt.hash(password, 10),
      },
    });
    res
      .status(201)
      .json({
        success: true,
        token: sign(employee),
        employee: publicEmployee(employee),
      });
  } catch (err) {
    next(err);
  }
};

// Login an existing employee
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "email and password are required" });

    const employee = await prisma.employee.findUnique({
      where: { email: email.trim().toLowerCase() },
    });
    if (!employee || !(await bcrypt.compare(password, employee.password)))
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    res.json({
      success: true,
      token: sign(employee),
      employee: publicEmployee(employee),
    });
  } catch (err) {
    next(err);
  }
};
