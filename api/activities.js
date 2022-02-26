const express = require('express');
const { getAllActivities } = require('../db');
const router = express.Router();

router.use((req, res, next) => {
  console.log("A request is being made to /activities");

  next();
});


module.exports = router;