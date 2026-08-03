const ApiError = require("../utils/ApiError");

const authorize = (...roles) => {
  return (req, res, next) => {
<<<<<<< HEAD
    if (!req.user) {
      return next(
        new ApiError(401, "Unauthorized")
      );
    }
=======
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df

    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
<<<<<<< HEAD
          "Access denied. Insufficient permissions."
=======
          "Access denied"
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
        )
      );
    }

    next();
<<<<<<< HEAD
=======

>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
  };
};

module.exports = authorize;