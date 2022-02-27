const express = require('express');
const router = express.Router();
const {updateRoutineActivity, getRoutineActivityById, getRoutineById, destroyRoutineActivity} = require('../db')
const {requireUser} = require('./utils')

// PATCH /routine_activities/:routineActivityId (**)
router.patch('/:routineActivityId', requireUser, async (req, res, next) => {
    const {routineActivityId} = req.params
    const {count, duration} = req.body
    try {
        const ra = await getRoutineActivityById(
            routineActivityId
        ) 
        const routine = await getRoutineById(
            ra.routineId
        )
        if (req.user.id === routine.creatorId) {
        const updatedRoutineActivity = await updateRoutineActivity({
            id: routineActivityId,
            count,
            duration 
            })
            res.send (
            updatedRoutineActivity
            ) 




        } 
        else {
            next ({
                message: `You don't own this routine.`
            })
        }
        

    }
    catch (error) {
        next (error)
    }
    
})

// DELETE /routine_activities/:routineActivityId
router.delete('/:routineActivityId', requireUser, async (req, res, next) => {
  const { routineActivityId } = req.params;

  try {
    const { routineId } = await getRoutineActivityById(routineActivityId);
    const routine = await getRoutineById(routineId);
    //next error if the user is not the owner
    if (req.user.id !== routine.creatorId) {
      next({
        name: "InvalidUser",
        message: "You are not the owner of this routine"
      });
      return;
    }
    const destroyedRoutine = await destroyRoutineActivity(routineActivityId)

    res.send(destroyedRoutine)
  } catch ({ name, message }) {
    next({ name, message });
  }
});



module.exports = router;