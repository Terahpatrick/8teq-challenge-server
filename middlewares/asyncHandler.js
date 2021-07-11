const { errorResponse } = require("../responses/responses");

/** @type {import("express").RequestHandler} */
function asyncHandler(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      console.log(ex);
      next(ex);
    }
  };
}

/** @type {import("express").RequestHandler} */
function asyncErrors(err, req, res, next) {
  return res.json(errorResponse("Internal Server Error"));
}

module.exports = { asyncHandler, asyncErrors };
