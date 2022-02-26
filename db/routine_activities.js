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

async function getRoutineActivityById(Id) {
  try {
    const { rows: [ activity ]  } = await client.query(`
      SELECT *
      FROM posts
      WHERE id=$1;
    `, [Id]);

    const { rows: tags } = await client.query(`
      SELECT tags.*
      FROM tags
      JOIN post_tags ON tags.id=post_tags."tagId"
      WHERE post_tags."postId"=$1;
    `, [Id])

    const { rows: [author] } = await client.query(`
      SELECT id, username, name, location
      FROM users
      WHERE id=$1;
    `, [post.authorId])

    post.tags = tags;
    post.author = author;

    delete post.authorId;

    return activity;
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