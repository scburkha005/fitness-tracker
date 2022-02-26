const express = require('express');
const { getAllPublicRoutines } = require('../db');
const router = express.Router();

router.use((req, res, next) => {
  console.log('A request is being made to /routines');

  next();
});

// GET api/routines
router.get('/', async (req, res, next) => {
  try {
    const allPublicRoutines = await getAllPublicRoutines();

    res.send(allPublicRoutines);
  } catch (err) {
    throw err;
  }
});

// POST api/routines
router.post('/', async (req, res, next) => {
  try {

  } catch (err) {
    throw err;
  }
});

module.exports = router;