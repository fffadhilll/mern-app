import User from "../models/usersModel.js";
import jwt from 'jsonwebtoken'

const protect = async (req, res, next) => {
    const { authorization } = req.headers
    if(!authorization) return res.status(400).json({ message: 'input token please' })
    if(!authorization.startsWith('Bearer')) return res.status(400).json({ message: 'token must be a Bearer' })

    try {
        const token = authorization.split(' ')[1]
        if(!token) return res.status(400).json({ message: 'wrong token' })

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')
        next()
    } catch (error) {
        console.log(error)
    }
}

export default protect