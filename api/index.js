// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
 const express = require('express');
 const router = express.Router();

//Create /api calls and router.use('/otherapifile', require('./otherapifile)) here
router.use('/activities', require('./activities'));

//Check server health /api/health
router.get('/health', (req, res, next) => {
  res.send({
    message: "Server is healthy"
  });
});

 module.exports = router;