const client = require('./client');

const createActivity = async ({ name, description }) => {
  const lowerCaseName = name.toLowerCase();
  try {
    if (!name || !description) {
      throw {
        name: "MissingRequiredFields",
        message: "Please provide both a name and description"
      }
    }

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

const updateActivity = async ({id, ...fields}) => {

  const setString = Object.keys(fields).map(
    (key, index) => `"${key}" = $${index + 1}`
  ).join(', ');

  const valuesArray = [...Object.values(fields), id] // O(n) + O(n) => O(n);
  // valuesArray = Object.values(fields) O(n);
  // valuesArray.push(id) O(1) + O(n), constant is ignored therefore => O(n);

  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [updatedActivity] } = await client.query(`
      UPDATE activities
      SET ${setString}
      WHERE id = $${valuesArray.length}
      RETURNING *; 
    `, valuesArray);

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