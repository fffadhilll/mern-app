import express from "express"
import { getAllGoals, getGoalById, addGoal, updateGoal, deleteGoal } from "../controller/goalsController.js"
import protect from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get('/', protect, getAllGoals)
router.get('/detail/:id', protect, getGoalById)
router.post('/create', protect, addGoal)
router.put('/update/:id', protect, updateGoal)
router.delete('/delete/:id', protect, deleteGoal)

export default router