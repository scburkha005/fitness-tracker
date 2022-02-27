const express = require('express');
const { getAllActivities, createActivity, updateActivity, getPublicRoutinesByActivity } = require('../db');
const { requireUser } = require('./utils')
const router = express.Router();

router.use((req, res, next) => {
  console.log("A request is being made to /activities");

  next();
});

// GET /api/activities
router.get('/', async (req, res, next) => {
  try {
    const allActivities = await getAllActivities();

    res.send(allActivities)
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST /api/activities
router.post('/', requireUser, async (req, res, next) => {
  try {
    const activity = await createActivity(req.body);

    //Capitalize first letter of every word
    const activityNameArray = activity.name.split(" ");
    for (let i = 0; i < activityNameArray.length; i++) {
      activityNameArray[i] = activityNameArray[i].charAt(0).toUpperCase() + activityNameArray[i].slice(1);
    }
    const activityName = activityNameArray.join(' ');
    activity.name = activityName;

    res.send(activity);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// PATCH /api/activities/:activityId
router.patch('/:activityId', requireUser, async (req, res, next) => {
  const { activityId: id } = req.params;
  const activityBody = { id, ...req.body };

  try {
    const updatedActivity = await updateActivity(activityBody);

    res.send(updatedActivity)
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/activities/:activityId/routines
router.get('/:activityId/routines', async (req, res, next) => {
  const { activityId: id } = req.params;

  try {
    const relatedRoutines = await getPublicRoutinesByActivity({ id });

    res.send(relatedRoutines)
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = router;