const requireUser = (req, res, next) => {
  if (!req.user) {
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action"
    });
  }

  next();
}

// const requireActiveUser = (req, res, next) => {
//   if (!req.user) {
//     next({
//       name: "MissingUserError",
//       message: "You must be logged in to perform this action"
//     });
//   } else if (!req.user.active)
// }

module.exports = {
  requireUser
}