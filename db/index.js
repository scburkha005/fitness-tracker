// require and re-export all files in this db directory (users, activities...)
const { createActivity, getAllActivities } = require('./activities');
const { createUser, getUser } = require('./users');

module.exports = {
  createActivity,
  createUser,
  getAllActivities,
  getUser
}