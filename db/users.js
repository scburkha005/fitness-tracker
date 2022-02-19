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

const getUser = async ({username, password}) => {
    try {
       const {rows: [user]} = await client.query(`
        SELECT *
        FROM users
        WHERE username = $1;
        `, [username])
        const isUser = await bcrypt.compare(password, user.password)
        if (isUser) {
            delete user.password;
            console.log(user); 
            return user;

        }
        
        

    }
    catch (error) {
        throw error;
    }



}

async function getUserById(userId) {
    try {
        const { rows: [user] } = await client.query(`
        SELECT * FROM users
        WHERE "id" =${ userId };
        `)
        delete user.password;
        return user;
        
    }
        catch (error) {
            throw error;
        } 
    }


module.exports = {
    createUser,
    getUser,
    getUserById
}