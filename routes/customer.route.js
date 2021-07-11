const express = require("express");
const { customerController } = require("../controllers/customer.controller");
const { asyncHandler } = require("../middlewares/asyncHandler");
const auth = require("../middlewares/auth");

const router = express.Router();

router
  .post("/", auth, asyncHandler(customerController.createCustomer))
  .put("/:id", auth, asyncHandler(customerController.updateCustomer))
  .get("/", asyncHandler(customerController.getCustomers));

module.exports = router;
