const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { validateLogin, validateUser } = require("../validations/user.validate");
const { formatMsg } = require("../utils/helpers");
const { successResponse, errorResponse } = require("../responses/responses");

const prisma = new PrismaClient();

exports.userController = {
  /** @type {import("express").RequestHandler} */
  async createUser(req, res) {
    const { error } = validateUser(req.body);
    if (error)
      return res
        .status(400)
        .json(errorResponse(formatMsg(error.details[0].message)));

    const { name, email, role, password, phone_number } = req.body;
    let user = await prisma.user.findUnique({ where: { email } });

    if (user)
      return res.status(400).json(errorResponse("User is already registered"));

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await prisma.user.create({
      data: { name, email, role, phone_number, password: hashedPassword },
    });

    return res.json(successResponse("User successfully registered", user));
  },

  /** @type {import("express").RequestHandler} */
  async loginUser(req, res) {
    const { error } = validateLogin(req.body);
    if (error)
      return res
        .status(400)
        .json(errorResponse(formatMsg(error.details[0].message)));

    const { email, password } = req.body;
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(400).json(errorResponse("User not found"));

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(400).json(errorResponse("Invalid email or password"));

    // Normally jwt private key is store in environment variable
    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      "jwtPrivateKey"
    );

    res.status(200).json(successResponse("Login Successful", { token }));
  },

  async updateUser(req, res) {
    const { id } = req.params;
    let user = await prisma.user.findUnique({ where: { id: +id } });
    if (!id || !user)
      res.status(404).json(errorResponse("User does not exist"));
    const { error } = validateUser(req.body);
    if (error)
      return res
        .status(400)
        .json(errorResponse(formatMsg(error.details[0].message)));

    const { name, phone_number } = req.body;

    user = await prisma.user.update({
      where: { id: +id },
      data: {
        name,
        email: user.email,
        role: user.role,
        phone_number,
        password: user.password,
      },
    });

    return res.json(successResponse("User updated successfully", user));
  },

  /** @type {import("express").RequestHandler} */
  async getUsers(_, res) {
    const users = await prisma.user.findMany();
    res.json(successResponse("List of users", users));
  },

  /** @type {import("express").RequestHandler} */
  async getUser(req, res) {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: +id } });
    if (!user) return res.status(200).json(errorResponse("User not found"));
    res.json(successResponse("User", user));
  },
};
