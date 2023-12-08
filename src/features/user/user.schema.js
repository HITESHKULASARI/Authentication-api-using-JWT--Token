import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: {type:String,
    
        validate: {
            validator: function(val) {
                return val.length >= 6 ;
            },
            message: `name should be more than or equal to 6 letters`
        }
    
    },
    email: {
        type: String,
        required: true,
        unique: true, // If you want to enforce unique email addresses
        lowercase: true, // Save emails in lowercase to ensure case-insensitive uniqueness
        validate: {
          validator: function (value) {
            // Regular expression for a basic email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
          },
          message: 'Invalid email address format'
        }
      },
    password: String,
    phone: {
        type : String,
        unique : true
    },
    age: Number,
    type: {type:String,enum:["Freshser","Student","experienced"]},
    tokens:  [{type:Object}]
    
})