import express from 'express'
import dotenv from 'dotenv'
import goalsRouter from './routes/goalsRouter.js'
import connectDb from './config/db.config.js'
import userRouter from './routes/usersRouter.js'

dotenv.config()
const app = express()

//db
connectDb()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//router
app.use('/api/goals', goalsRouter)
app.use('/api/users', userRouter)

//app running
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))