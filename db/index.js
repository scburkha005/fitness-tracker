// require and re-export all files in this db directory (users, activities...)
const { createActivity, getAllActivities, getActivityById, updateActivity } = require('./activities');
const { createUser, getUser } = require('./users');
const { createRoutine, getRoutinesWithoutActivities, getAllRoutines, getRoutineById } = require('./routines')
const { addActivityToRoutine } = require('./routine_activities');

module.exports = {
  createActivity,
  createUser,
  getAllActivities,
  getUser,
  getActivityById,
  updateActivity,
  createRoutine,
  getRoutinesWithoutActivities,
  getAllRoutines,
  addActivityToRoutine,
  getRoutineById
}