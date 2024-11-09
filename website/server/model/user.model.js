import mongoose from "mongoose"
import AutoIncrementFactory from "mongoose-sequence";
const AutoIncrement = AutoIncrementFactory(mongoose);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 20
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    }
});

userSchema.plugin(AutoIncrement, { inc_field: "userId", start_seq: 1 });

const user = mongoose.model('user', userSchema);

export default user;