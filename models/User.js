const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 
            "Please enter a valid email"]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought'
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
    ],
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);


UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', UserSchema);

module.exports = User;
