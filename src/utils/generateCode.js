const { v4: uuidv4 } = require("uuid");

function generateCode(customCode) {
  if (customCode) return customCode;
  return uuidv4().slice(0, 8); // short unique code
}

module.exports = generateCode;
