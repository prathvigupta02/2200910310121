module.exports = (req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`;
  console.log(log);
  next();
};
