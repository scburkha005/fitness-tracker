const express = require('express');
const { getAllPublicRoutines, createRoutine } = require('../db');
const { requireUser } = require('./utils');
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
  } catch ({ name, message }) {
    next({ name, message })
  }
});

// POST api/routines
router.post('/', requireUser, async (req, res, next) => {
  const { id: creatorId } = req.user;
  const routineObj = { creatorId, ...req.body };

  try {
    const newRoutine = await createRoutine(routineObj);

    res.send(newRoutine)
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// PATCH api/routines/:routineId
router.patch('/:routineId', async (req, res, next) => {
  const { routineId } = req.params;
  try {

  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = router;