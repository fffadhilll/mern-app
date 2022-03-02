import Goal from '../models/goalsModel.js'
import User from '../models/usersModel.js'

export const getAllGoals = async (req, res) => {
    const goals = await Goal.find({
        userId: req.user.id
    })

    res.status(201)
        .json({
            message: 'get successfully',
            data: goals
        })
}

export const getGoalById = async (req, res) => {
    const goalById = await Goal.findById(req.params.id)
    if(!goalById) return res.status(400).json({ message: 'id not found' })

    res.status(201)
        .json({
            message: `get ${req.params.id} successfully`,
            data: goal
        })
}

export const addGoal = async (req, res) => {
    const { goal } = req.body
    if(!goal) return res.status(400).json({ message: 'please add a goal' })

    const saveGoal = await Goal.create({
        userId: req.user.id,
        goal
    })

    res.status(201)
        .json({
            message: 'post successfully',
            data: saveGoal
        })
}

export const updateGoal = async (req, res) => {
    const goalById = await Goal.findById(req.params.id)
    if(!goalById) return res.status(400).json({ message: 'id not found' })

    const userExists = await User.findById(req.user.id)
    if(!userExists) return res.status(400).json({ message: 'user not found' })

    if(goalById.userId.toString() !== userExists.id) return res.status(400).json({ message: 'user not authorized' })

    const { goal } = req.body
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, { goal })

    res.status(201)
        .json({
            message: `update ${req.params.id} successfully`,
            data: updatedGoal
        })
}

export const deleteGoal = async (req, res) => {
    const goalById = await Goal.findById(req.params.id)
    if(!goalById) return res.status(400).json({ message: 'id not found' })

    const userExists = await User.findById(req.user.id)
    if(!userExists) return res.status(400).json({ message: 'user not found' })

    if(goalById.userId.toString() !== userExists.id) return res.status(400).json({ message: 'user not authorized' })

    await goalById.remove()

    res.status(201)
        .json({
            message: `delete ${req.params.id} successfully`
        })
}