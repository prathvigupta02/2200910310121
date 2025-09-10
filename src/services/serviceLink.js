const Link = require("../models/Link");
const generateCode = require("../utils/generatecode");

const createShortLink = async (originalUrl, validityMinutes, customCode) => {
  const code = generateCode(customCode);
  const expiresAt = new Date(Date.now() + (validityMinutes || 30) * 60000);

  const newLink = new Link({
    originalUrl,
    shortCode: code,
    expiresAt,
  });

  return await newLink.save();
};

const getOriginalUrl = async (code) => {
  const link = await Link.findOne({ shortCode: code });

  if (!link) throw new Error("Shortcode not found");
  if (link.expiresAt < new Date()) throw new Error("Link expired");

  return link.originalUrl;
};

module.exports = { createShortLink, getOriginalUrl };
