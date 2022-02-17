// require and re-export all files in this db directory (users, activities...)
const { createActivity } = require('./activities');

module.exports = {
  createActivity
}