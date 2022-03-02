import mongoose from "mongoose"

const goalSchema = mongoose.Schema({
    goal: {
        type: String,
        required: [true, 'please add a goal']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

export default mongoose.model('Goal', goalSchema)