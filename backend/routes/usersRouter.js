import express from "express"
import { getMe, loginUser, registerUser } from "../controller/userController.js"
import protect from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/Me', protect, getMe)

export default router