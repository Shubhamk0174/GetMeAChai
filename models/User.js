
import mongoose from "mongoose";

const {Schema, model} = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },  
    username: { type: String, required: true, unique: true },
    profilePicture: { type: String,  },
    coverPicture: { type: String, },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
     razorpayid: { type: String, default: "" },
        razorpaysecret: { type: String, default: "" },
});

export default mongoose.models.User || model('User', userSchema);;