import User from '../models/usersModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Goal from '../models/goalsModel.js'

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
}

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    if(!name || !email || !password) return res.status(400).json({ message: 'please add all fields' })

    const userExists = await User.findOne({ email })
    if(userExists) return res.status(400).json({ message: 'user sudah ada' })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const createUser = await User.create({
        name,
        email,
        password: hashedPassword,
    }) 

    if(createUser) {
        res.status(201)
            .json({
                message: 'register successfully',
                data: createUser,
                token: generateToken(createUser._id)
            })
    } else{
        return res.status(400).json({ message: 'failed' })
    }

}

export const loginUser = async (req, res) => {
    const { name, email, password } = req.body
    if(!name || !email || !password) return res.status(400).json({ message: 'please add all fields' })

    const checkUser = await User.findOne({ name, email })
    if(!checkUser) return res.status(400).json({ message: 'user not found' })

    const checkPassword = await bcrypt.compare(password, checkUser.password)
    if(!checkPassword) return res.status(400).json({ message: 'wrong password' })

    res.status(201)
        .json({
            message: `login successfully`,
            data: checkUser,
            token: generateToken(checkUser._id)
        })
}

export const getMe = async (req, res) => {
    const userId = await User.findById(req.user.id)

    res.status(201)
        .json({
            message: `data user display`,
            data: userId
        })
}