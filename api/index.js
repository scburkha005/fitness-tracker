// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');

const { JWT_SECRET } = process.env;


//JWT Auth
router.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  
  if (!auth) {
    next();
  }
  else if (auth.startsWith(prefix)) {
    const [ , token] = auth.split(' ');
    try {
     const { id } = jwt.verify(token, JWT_SECRET);

     if (id) {
       req.user = await getUserById(id);
       next();
     }
    } catch ({ name, message }) {
      next({ name, message })
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`
    });
  }
});

//log user
router.use((req, res, next) => {
  if (req.user) {
    console.log('User is set:', req.user);
  }
  
  next();
});

//Create /api calls and router.use('/otherapifile', require('./otherapifile)) here
// api/activities
router.use('/activities', require('./activities'));
// api/routines
router.use('/routines', require('./routines'));
// api/users
router.use('/users', require('./users'));
//Check server health /api/health
router.get('/health', (req, res, next) => {
  res.send({
    message: "Server is healthy"
  });
});

 module.exports = router;