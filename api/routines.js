const express = require('express');
const { getAllPublicRoutines, createRoutine, updateRoutine, destroyRoutine, getRoutineById, addActivityToRoutine, getRoutineActivitiesByRoutine, getPublicRoutinesByActivity } = require('../db');
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
router.patch('/:routineId', requireUser, async (req, res, next) => {
  const { routineId: id } = req.params;
  const routineValuesToUpdate = { id, ...req.body };
  
  try {
    const { creatorId } = await getRoutineById(id);
    if (req.user.id !== creatorId) {
      next({
        name: "InvalidUserError",
        message: "You are not the owner of this routine"
      });
    }

    const updatedRoutine = await updateRoutine(routineValuesToUpdate);

    res.send(updatedRoutine);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// DELETE api/routines/:routineId
router.delete('/:routineId', requireUser, async (req, res, next) => {
  const { routineId } = req.params;

  try {
    //check to see if user owns routine
    const { creatorId } = await getRoutineById(routineId);
    console.log('creatorid', creatorId)
    if (req.user.id !== creatorId) {
      next({
        name: "InvalidUserError",
        message: "You are not the owner of this routine"
      });
      return;
    }

    const deletedRoutine = await destroyRoutine(routineId);

    if (!deletedRoutine) {
      next({
        name: "RoutineNotFoundError",
        message: "Could not find a routine with that routineId"
      })
      return;
    }

    res.send(deletedRoutine);
  } catch ({ name, message }) {
    next({ name, message });
  }
})

//POST /routines/:routineId/activities
router.post('/:routineId/activities', async (req, res, next) => {
  const { routineId } = req.params;
  const activityRoutine = { ...req.body, routineId}
  
  try {
    if (req.body.count === 0 || req.body.duration === 0) {
      next({
        name: "InvalidInformation",
        message: "Count and duration cannot be 0"
      })
      return;
    }
    const routineActivityPair = await addActivityToRoutine(activityRoutine);

    res.send(routineActivityPair)
  } catch ({ name, message }) {
    next({ name, message });
  }
})

module.exports = router;