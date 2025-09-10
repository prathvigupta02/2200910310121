const { createShortLink, getOriginalUrl } = require("../services/linkService");

const shortenUrl = async (req, res, next) => {
  try {
    const { originalUrl, validityMinutes, customCode } = req.body;
    const link = await createShortLink(originalUrl, validityMinutes, customCode);
    res.json({ shortUrl: `${req.headers.host}/${link.shortCode}`, expiresAt: link.expiresAt });
  } catch (err) {
    next(err);
  }
};

const redirectUrl = async (req, res, next) => {
  try {
    const { code } = req.params;
    const url = await getOriginalUrl(code);
    res.redirect(url);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { shortenUrl, redirectUrl };
