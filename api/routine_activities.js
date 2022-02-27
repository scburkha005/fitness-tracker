const express = require('express');
const router = express.Router();
const {updateRoutineActivity, getRoutineActivityById, getRoutineById} = require('../db')
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




module.exports = router;