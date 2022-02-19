const client = require('./client');

const addActivityToRoutine = async ({ routineId, activityId, count, duration }) => {
  try {
    const { rows: [routine_activity] } = await client.query(`
      INSERT INTO routine_activities("routineId", "activityId", count, duration)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [routineId, activityId, count, duration]);

    return routine_activity;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  addActivityToRoutine
}