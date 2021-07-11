const express = require("express");
const { userController } = require("../controllers/user.controller");
const { asyncHandler } = require("../middlewares/asyncHandler");
const auth = require("../middlewares/auth");

const router = express.Router();

router
  .post("/", auth, asyncHandler(userController.createUser))
  .put("/:id", auth, asyncHandler(userController.updateUser))
  .get("/", asyncHandler(userController.getUsers))
  .get("/:id", asyncHandler(userController.getUser))
  .post("/login", asyncHandler(userController.loginUser));

module.exports = router;
