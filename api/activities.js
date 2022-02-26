const express = require('express');
const { getAllActivities, createActivity, updateActivity } = require('../db');
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
  } catch (err) {
    throw err;
  }
});

// POST /api/activities
router.post('/', async (req, res, next) => {
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
  } catch (err) {
    throw err;
  }
});

// PATCH /api/activities/:activityId
router.patch('/:activityId', (req, res, next) => {
  const activityId = req.params;
  console.log('reqbody', req.body)

  try {
    const updatedActivity = updateActivity(activityId, req.body);

    res.send(updatedActivity)
  } catch (err) {
    throw err;
  }
});

module.exports = router;