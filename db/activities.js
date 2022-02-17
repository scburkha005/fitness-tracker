const client = require('./client');

const createActivity = async ({ name, description }) => {
  console.log('name:', name)
  const lowerCaseName = name.toLowerCase();
  try {
    const {rows: [activity] } = await client.query(`
      INSERT INTO activities(name, description)
      VALUES ($1, $2)
      RETURNING *; 
    `, [lowerCaseName, description]);

    return activity;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createActivity
}