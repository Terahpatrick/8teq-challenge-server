const express = require("express");
const { parcelController } = require("../controllers/parcel.controller");
const { asyncHandler } = require("../middlewares/asyncHandler");
const auth = require("../middlewares/auth");

const router = express.Router();

router
  .post("/", auth, asyncHandler(parcelController.dispatchParcel))
  .put("/:id", auth, asyncHandler(parcelController.updateDispatch))
  .get("/revenue", asyncHandler(parcelController.getRevenue))
  .get("/", asyncHandler(parcelController.getAllParcels));

module.exports = router;
