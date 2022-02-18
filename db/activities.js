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

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById
}