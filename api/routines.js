const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log('A request is being made to /routines');

  next();
});

module.exports = router;