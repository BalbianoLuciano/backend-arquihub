const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    nickname: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    },
    type: {
        type: String,
        enum: ["user", "admin", "superadmin", "member"],
        default: "user"
    },
    projects: [{
        type: String
    }],
    favourites: [{
        type: String
    }],
    status: {
        type: String,
        enum: ["active", "banned", "inactive"],
        default: "active"
    }
}, {
    timestamps: true
})


UserSchema.statics.encryptPassword=async(password)=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
    }
    
    
    UserSchema.statics.comparePassword=async(password, recievedPassword)=>{
        return await bcrypt.compare(password, recievedPassword)
    }  

    
module.exports = mongoose.model("users", UserSchema)

