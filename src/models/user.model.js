import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
//trim removing extra spaces from the beginning and end of string before saving to the database
        trim:true,

//index true krdo taaki database ki searching m aaajye
        index:true,
    },

     email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },

     fullname:{
        type:String,
        required:true,
        trim:true,
        index:true,
    },

    avatar:{
        type:String,//cloudinary url
        required:true,
    },

    coverImage:{
        type:String,//cloudinary url
    },

    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"video"
        }
    ],

    password:{
        type:String,
        required:[true,'Password is required']
    },

    refershToken:{
        type:String
    }

    },
    {
        timestamps:true
    }
)

// Using Hooks of Middleware
userSchema.pre("save",async function (next) {
   
    //agar modify nhi hua h toh simply return krdo 
    if(!this.isModified("password")) return next();

    //aakhiri m 10 round diya h
    this.password=bcrypt.hash(this.password,10)
    next()
})

//Custom methods
userSchema.methods.isPasswordCorrect = async function
(password) {
    //bscrypt hash password deta h aur compare bhi krta h 
 return await  bcrypt.compare(password,this.password)

}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
        {
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
     return jwt.sign(
        {
        _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
         expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User",userSchema)
