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
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Please enter a valid email"]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thoughts'
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
    ],
});

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
}
);

const User = model('user', UserSchema);

module.exports = User;
