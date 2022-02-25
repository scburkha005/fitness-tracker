// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
 const express = require('express');
 const router = express.Router();

//Create /api calls and router.use('/otherapifile', require('./otherapifile)) here

 module.exports = router;