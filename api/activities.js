const express = require('express');
const { getAllActivities, createActivity } = require('../db');
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
  console.log('req.body', req.body)
  try {
    const activity = await createActivity(req.body);

    res.send(activity);
  } catch (err) {
    throw err;
  }
});

module.exports = router;