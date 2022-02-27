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

async function getRoutineActivityById(id) {
  try {
    const { rows: [ra]} = await client.query(`
    SELECT *
    FROM routine_activities
    WHERE id=$1;
    `, [id]);

    return ra;
  } catch (error) {
    throw error;
  }
}

const getRoutineActivitiesByRoutine = async ({ id })=> {
  try {
    const { rows } = await client.query(`
      SELECT * 
      FROM routine_activities
      WHERE "routineId"=$1;
    `, [id])
    return rows;
  }
    catch (error) {
      throw error;
    }
}

const updateRoutineActivity = async ({ id, ...fields }) => {
  const setString = Object.keys(fields).map(
    (key, index) => `"${key}" = $${index + 1}`
  ).join(', ');

  if (setString.length === 0) {
    return;
  }
  const valuesArray = [...Object.values(fields), id];
  try {
    const { rows: [updatedRoutineActivity] } = await client.query(`
    UPDATE routine_activities
    SET ${setString}
    WHERE id = $${valuesArray.length}
    RETURNING *;
    
    `, valuesArray)
    return updatedRoutineActivity;



  }
  catch (error) {
    throw error;
  }
}

const destroyRoutineActivity = async (id) => {
  try {
    const { rows: [destroyedRoutineActivity] } = await client.query(`
      DELETE FROM routine_activities
      WHERE id = $1
      RETURNING *;
    `, [id]);
    return destroyedRoutineActivity;
    //waiting for getRoutineActivitiesByRoutine helper function for test
  } catch (err) {
    throw err;
  }
}

module.exports = {
  addActivityToRoutine,
  getRoutineActivityById,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity
}