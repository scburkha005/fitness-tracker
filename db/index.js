// require and re-export all files in this db directory (users, activities...)
const { createActivity, getAllActivities, getActivityById, updateActivity } = require('./activities');
const { createUser, getUser } = require('./users');
const { createRoutine, getRoutinesWithoutActivities, getAllRoutines } = require('./routines')

module.exports = {
  createActivity,
  createUser,
  getAllActivities,
  getUser,
  getActivityById,
  updateActivity,
  createRoutine,
  getRoutinesWithoutActivities,
  getAllRoutines
}