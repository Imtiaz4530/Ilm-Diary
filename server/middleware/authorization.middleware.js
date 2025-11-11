const authorization = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({
        message: "Access denied. Only admin can Create/Edit/Delete IlM Record!",
      });
  }
  next();
};

module.exports = authorization;
