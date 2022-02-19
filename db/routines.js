const client = require('./client');

const createRoutine = async ({ creatorId, isPublic, name, goal }) => {
  try {
    if (!name || !goal) {
      throw {
        name: "MissingRequiredFields",
        message: "Please fill out both the name and goal fields"
      };
    }
    const { rows: [routine] } = await client.query(`
      INSERT INTO routines("creatorId", "isPublic", name, goal)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [creatorId, isPublic, name, goal]);

    return getRoutineById(routine.id);
  } catch (err) {
    throw err;
  }
}

const getRoutinesWithoutActivities = async () => {
  try {
    const { rows: routines } = await client.query(`
      SELECT * FROM routines; 
    `);

    if (!routines) {
      throw {
        name: "MissingInformation",
        message: "No activities exist"
      }
    }

    return routines;
  } catch (err) {
    throw err;
  }
}

//helper function to both grab single routine by id AND to create our ideal routine object
//routine = {routine, activities, author?}
const getRoutineById = async (routineId) => {
  try {
    const { rows: [routine] } = await client.query(`
      SELECT * FROM routines
      WHERE id = $1;
    `, [routineId]);

    if (!routine) {
      throw {
        name: "RoutineNotFoundError",
        message: "Could not find a routine with that routineId"
      }
    }

    const { rows: activities } = await client.query(`
      SELECT activities.* FROM activities
      JOIN routine_activities ON activities.id = routine_activities."activityId"
      WHERE "routineId" = $1;
    `, [routineId]);

    routine.activities = activities;

    return routine;
  } catch (err) {
    throw err;
  }
}

const getAllRoutines = async () => {
  try {
    const { rows: routineIds } = await client.query(`
      SELECT id FROM routines; 
    `);

    const routines = await Promise.all(routineIds.map(routine => getRoutineById(routine.id)));
    return routines;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createRoutine,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getRoutineById
}