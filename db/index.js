// require and re-export all files in this db directory (users, activities...)
const { createActivity } = require('./activities');
const { createUser } = require('./users');

module.exports = {
  createActivity,
  createUser
}