const { PrismaClient } = require("@prisma/client");

const { formatMsg } = require("../utils/helpers");
const { successResponse, errorResponse } = require("../responses/responses");
const {
  validateParcelClose,
  validateParcelDispatch,
} = require("../validations/parcel.validate");

const prisma = new PrismaClient();

exports.parcelController = {
  /** @type {import("express").RequestHandler} */
  async dispatchParcel(req, res) {
    const { error } = validateParcelDispatch(req.body);
    if (error)
      return res
        .status(400)
        .json(errorResponse(formatMsg(error.details[0].message)));

    const { sender_id, recepient_id, amount, description, name } = req.body;
    if (sender_id === recepient_id)
      return res.status(400).json(errorResponse("Sender cannot be repient"));
    const sender = await prisma.customer.findUnique({
      where: { id: sender_id },
    });

    const recepient = await prisma.customer.findUnique({
      where: { id: recepient_id },
    });

    if (!recepient || !sender)
      return res.status(400).json(errorResponse("Customer does not exist"));

    const parcel = await prisma.parcel.create({
      data: {
        sender_id,
        recepient_id,
        status: "sent",
        amount,
        description,
        name,
      },
    });

    return res.json(successResponse("Parcel sent successfully", parcel));
  },

  /** @type {import("express").RequestHandler} */
  async updateDispatch(req, res) {
    const { id } = req.params;
    let parcel = await prisma.parcel.findUnique({ where: { id: +id } });
    if (!parcel) return res.status(404).json(errorResponse("Parcel not found"));

    const { error } = validateParcelClose(req.body);
    if (error)
      return res
        .status(400)
        .json(errorResponse(formatMsg(error.details[0].message)));

    const { sender_id, recepient_id, amount, description, status, name } =
      req.body;

    parcel = await prisma.parcel.update({
      where: { id: +id },
      data: { sender_id, recepient_id, status, amount, description, name },
    });

    return res.json(successResponse("Parcel successfully updated", parcel));
  },

  /** @type {import("express").RequestHandler} */
  async getAllParcels(_, res) {
    const parcels = await prisma.parcel.findMany();
    for (let item of parcels) {
      const sender = await prisma.customer.findUnique({
        where: { id: item.sender_id },
      });
      const recepient = await prisma.customer.findUnique({
        where: { id: item.recepient_id },
      });
      item.sender_name = sender.name;
      item.sender_phone = sender.phone_number;
      item.recepient_name = recepient.name;
      item.recepient_phone = recepient.phone_number;
    }
    res.json(successResponse("List of all parcels", parcels));
  },

  /** @type {import("express").RequestHandler} */
  async getRevenue(_, res) {
    const parcels = await prisma.parcel.findMany();
    let revenue = 0;
    for (let item of parcels) {
      revenue += item.amount;
    }

    return res.status(200).json(successResponse("Total revenue", { revenue }));
  },
};
