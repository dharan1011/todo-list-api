const mongoose = require('mongoose');
const userSchema  = new mongoose.Schema({
    createdAt: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    githubId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
    },
    githubAccessToken: {
        type: String,
        required: true
    },
    githubRefreshToken: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
});

// userSchema.statics.findByGithubId = (githubId) => {
//     return this.findOne({githubId});
// }

const User = mongoose.model('User', userSchema);
module.exports = User;