const client = require('./client');

const createActivity = async ({ name, description }) => {
  const lowerCaseName = name.toLowerCase();
  try {
    const { rows: [activity] } = await client.query(`
      INSERT INTO activities(name, description)
      VALUES ($1, $2)
      RETURNING *; 
    `, [lowerCaseName, description]);

    return activity;
  } catch (err) {
    throw err;
  }
}

const getAllActivities = async () => {
  try {
    const { rows: activities } = await client.query(`
      SELECT * FROM activities;
    `);

    if (!activities) {
      throw {
        name: "MissingInformation",
        message: "No activities exist"
      }
    }

    return activities;
  } catch (err) {
    throw err;
  }
}

const getActivityById = async (id) => {
  try {
    const { rows: [activity] } = await client.query(`
      SELECT * FROM activities
      WHERE id = $1; 
    `, [id]);

    return activity;
  } catch (err) {
    throw err;
  }
}

const updateActivity = async (fields = {}) => {
  const { id } = fields;
  //remove id from fields => don't want to update id
  delete fields.id;
  const setString = Object.keys(fields).map(
    (key, index) => `"${key}" = $${index + 1}`
  ).join(', ');
  console.log('id', id)
  const valuesArray = [...Object.values(fields), id]

  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [updatedActivity] } = await client.query(`
      UPDATE activities
      SET ${setString}
      WHERE id = $${Object.values(fields).length + 1}
      RETURNING *; 
    `, valuesArray);
    console.log('activity', updatedActivity)

    return updatedActivity;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity
}