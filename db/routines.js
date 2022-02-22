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

    //grab activities including duration and count
    const { rows: activities } = await client.query(`
      SELECT activities.*, routine_activities.duration, routine_activities.count
      FROM activities
      JOIN routine_activities ON activities.id = routine_activities."activityId"
      WHERE "routineId" = $1;
    `, [routineId]);

    //grab username
    const { rows: [author] } = await client.query(`
      SELECT username FROM users
      WHERE id = $1; 
    `, [routine.creatorId]);

    //store username as creatorName in object
    const creatorName = author.username;
    const newRoutine = {...routine, activities, creatorName};

    return newRoutine;
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

const getAllRoutinesByUser = async ({ id }) => {
  try {
    const { rows : routineIds } = await client.query(`
      SELECT id FROM routines
      WHERE "creatorId" = $1;
    `, [id]);

    const userRoutines = await Promise.all(routineIds.map(routine => getRoutineById(routine.id)));
    return userRoutines;
  } catch (err) {
    throw err;
  }
}

const getAllPublicRoutines = async () => {
  try {
    const { rows: routineIds } = await client.query(`
      SELECT id FROM routines
      WHERE "isPublic" = true;
    `);

    const publicRoutines = await Promise.all(routineIds.map(routine => getRoutineById(routine.id)));
    return publicRoutines;
  } catch (err) {
    throw err;
  }
}

const getPublicRoutinesByUser = async ({ id }) => {
  try {
    const { rows: routineIds } = await client.query(`
      SELECT id FROM routines
      WHERE "isPublic" = true AND "creatorId" = $1; 
    `, [id]);

    if (!routineIds) {
      throw {
        name: "InvalidUser",
        message: "User does not exist"
      }
    }

    const publicUserRoutines = await Promise.all(routineIds.map(routine => getRoutineById(routine.id)));
    return publicUserRoutines;
  } catch (err) {
    throw err;
  }
}

// returns all public routines filtered by a specific activity
const getPublicRoutinesByActivity = async ({ id }) => {
  try {
    const { rows: routineIds } = await client.query(`
      SELECT routines.id FROM routines
      JOIN routine_activities ON routines.id = routine_activities."routineId"
      WHERE "isPublic" = true AND routine_activities."activityId" = $1;
    `, [id]);

    const publicRoutinesByActivity = await Promise.all(routineIds.map(routine => getRoutineById(routine.id)));
    return publicRoutinesByActivity;
  } catch (err) {
    throw err;
  }
}

const updateRoutine = async ({ id, ...fields }) => {
  // fields = { isPublic, name, goal }
  const setString = Object.keys(fields).map(
    (key, index) => `"${key} = $${index + 1}`
  ).join(', ');

  if (setString.length === 0) {
    return;
  }

  const valuesArray = [...Object.values(fields), id];
  try {
    const { rows: [updatedRoutine] } = await client.query(`
    
    `)
    return updatedRoutine;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createRoutine,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getRoutineById,
  getAllRoutinesByUser,
  getAllPublicRoutines,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  updateRoutine
}