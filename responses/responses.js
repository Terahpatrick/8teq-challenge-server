function errorResponse(message) {
  return {
    status: "001",
    message,
  };
}

function successResponse(message, data) {
  return {
    status: "000",
    message,
    data,
  };
}

module.exports = {
  errorResponse,
  successResponse,
};
