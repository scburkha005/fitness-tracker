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

    return routine;
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

const getAllRoutines = async () => {
  try {

  } catch (err) {
    throw err;
  }
}

module.exports = {
  createRoutine,
  getRoutinesWithoutActivities,
  getAllRoutines
}