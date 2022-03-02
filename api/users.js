const express = require('express');
const { createUser, getUserByUsername, getUser, getPublicRoutinesByUser } = require('../db');
const jwt = require('jsonwebtoken');
const { requireUser } = require('./utils');
const { JWT_SECRET } = process.env;
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
const token = jwt.sign({
    id: user.id, 
    username
},JWT_SECRET,{
    expiresIn: '1w'
})

res.send({
    message: 'Thank you for signing up',
    token,
    user
})


}
catch ({ name, message }) {
    next({ name, message })
}


})

//POST users/login
router.post('/login', async (req, res, next) => {
const { username, password } = req.body
try {
const user = await getUser({username, password})
if (user)
{
    const token = jwt.sign(user, JWT_SECRET) 
    res.send({
        token, 
        message: 'Thanks for logging in.'
    })

}
else {
    next({
        name: 'Incorrect credentials',
        message: 'Username or password is incorrect'
    })
}



}    
catch ({ name, message }){
    next({ name, message })
}



})

// GET users/me 

router.get('/me', requireUser, async (req, res, next) => {
    res.send({
        ...req.user
    })



})

// GET users/:username/routines

router.get('/:username/routines', async (req, res, next) => {
    const {username} = req.params
    const user = await getUserByUsername(username)
    const routines = await getPublicRoutinesByUser(user)
    res.send(
        routines
    )

})

module.exports = router;