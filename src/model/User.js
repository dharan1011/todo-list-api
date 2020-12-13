const mongoose = require('mongoose');
const _ = require('lodash');
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

class UserClass {
    static async findOrCreateOne({email, githubId, githubAccessToken, githubRefreshToken, firstName, lastName}){
        const user = await this.findOne({email});
        if(user){
            const modifier = {};
            if(githubId){
                modifier.githubId = githubId;
            }
            if(githubAccessToken){
                modifier.githubAccessToken = githubAccessToken;
            }
            if(githubRefreshToken){
                modifier.githubRefreshToken = githubRefreshToken;
            }
            if(firstName){
                modifier.firstName = firstName;
            }
            if(lastName){
                modifier.lastName = lastName;
            }
            if(_.isEmpty(modifier)){
                return user;
            }
            await this.updateOne({email}, { $set : modifier });
            return user;
        }
        const newUser = await this.create({
            createdAt: new Date(),
            email,
            githubId,
            githubAccessToken,
            githubRefreshToken,
            firstName,
            lastName,
        });
        // send welcome mail

        return newUser;
    }
}

userSchema.loadClass(UserClass);
const User = mongoose.model('User', userSchema);
module.exports = User;