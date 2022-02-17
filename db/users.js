const client = require("./client")
const bcrypt = require('bcrypt')
const SALT_COUNT = 10;


const createUser = async ({username, password}) => {
   
  try { 
      if (!username || !password) {
          throw {
              name: 'Missing credentials.',
              message: 'Missing username or password.'
          }
      }
      const hashpwd = await bcrypt.hash(password, SALT_COUNT)
      const {rows: [user] }= await client.query(`
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        RETURNING *;
    `, [username, hashpwd])
    console.log(user)
   delete user.password;
    return user;
  }
  catch (error) {
    throw error;
  }
}

module.exports = {
    createUser
}