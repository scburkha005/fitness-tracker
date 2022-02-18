// require and re-export all files in this db directory (users, activities...)
const { createActivity, getAllActivities, getActivityById } = require('./activities');
const { createUser, getUser } = require('./users');

module.exports = {
  createActivity,
  createUser,
  getAllActivities,
  getUser,
  getActivityById
}