const { PrismaClient } = require("@prisma/client");

const { formatMsg } = require("../utils/helpers");
const { successResponse, errorResponse } = require("../responses/responses");
const { validateCustomer } = require("../validations/customer.validate");

const prisma = new PrismaClient();

exports.customerController = {
  /** @type {import("express").RequestHandler} */
  async createCustomer(req, res) {
    const { error } = validateCustomer(req.body);
    if (error)
      return res
        .status(400)
        .json(errorResponse(formatMsg(error.details[0].message)));

    const { name, email, phone_number, teller_id, address } = req.body;
    let customer = await prisma.customer.findUnique({ where: { email } });

    if (customer)
      return res.status(400).json(errorResponse("Customer already exist"));

    customer = await prisma.customer.create({
      data: { name, email, phone_number, teller_id, address },
    });

    return res.json(successResponse("Customer created successfully", customer));
  },

  /** @type {import("express").RequestHandler} */
  async updateCustomer(req, res) {
    const { id } = req.params;
    let customer = await prisma.customer.findUnique({ where: { id: +id } });
    if (!id || !customer)
      res.status(404).json(errorResponse("Customer does not exist"));
    const { error } = validateCustomer(req.body);
    if (error)
      return res
        .status(400)
        .json(errorResponse(formatMsg(error.details[0].message)));

    const { name, phone_number, teller_id, address } = req.body;

    customer = await prisma.customer.update({
      where: { id: +id },
      data: { name, email: customer.email, phone_number, teller_id, address },
    });

    return res.json(successResponse("Customer updated successfully", customer));
  },

  /** @type {import("express").RequestHandler} */
  async getCustomers(_, res) {
    const customers = await prisma.customer.findMany();
    res.json(successResponse("List of customers", customers));
  },
};
