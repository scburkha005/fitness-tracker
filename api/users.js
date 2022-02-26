const express = require('express');
const { createUser, getUserByUsername } = require('../db');

const router = express.Router();

router.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

// POST/users/register
router.post('/register', async (req, res, next) => {
const { username, password } = req.body 
try {
    const checkUser = await getUserByUsername (
        username
    ) 
    console.log ('checkUser',checkUser)
    if (checkUser) {
        next({
            name: 'User already exists',
            response: 'A user by that username already exists'
        })
        
        return 
    }
if (password.length <= 8) {
    next({
        name: 'password required',
        message: 'Please make the password at least 8 characters long.'
    })
    return
}


const user = await createUser({username, password})
res.send({user})


}
catch (error) {
throw (error)

}


}),




module.exports = router;