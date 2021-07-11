const jwt = require("jsonwebtoken");

const { errorResponse } = require("../responses/responses");

/** @type {import("express").RequestHandler} */
function auth(req, res, next) {
  const token = req.header("Authorization");
  if (!token)
    res.status(401).json(errorResponse("Access denied. No token provided"));

  try {
    const decoded = jwt.verify(token, "jwtPrivateKey");
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json(errorResponse("Invalid token"));
  }
}

module.exports = auth;
