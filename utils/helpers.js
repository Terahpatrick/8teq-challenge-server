function formatMsg(msg) {
  return msg.replace(/['"]+/g, "");
}

module.exports = { formatMsg };
