const GithubStrategy = require('passport-github').Strategy;
const User = require('../model/User');
module.exports = (passport) => {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });

    passport.use(new GithubStrategy(
        {
            clientID : process.env.GITHUB_CLIENT_ID,
            clientSecret : process.env.GITHUB_CLIENT_SECRET,
            callbackURL : 'http://localhost:3000/v1/auth/callback'
        },
        async (githubAccessToken, githubRefreshToken, profile, done) => {
            // create or find user
            const newUser = {
                createdAt: new Date(),
                email : profile._json.email,
                githubId : profile.id,
                username : profile.username,
                displayName : profile.displayName,
                githubAccessToken,
                githubRefreshToken,
            }
            try{
                let user = await User.findOne({ githubId : newUser.githubId });
                if(user){
                    const modifier = {};
                    if(githubAccessToken){
                        modifier.githubAccessToken = githubAccessToken;
                    }
                    if(githubRefreshToken){
                        modifier.githubRefreshToken = githubRefreshToken;
                    }
                    await User.updateOne({ githubId : newUser.githubId }, { $set : modifier });
                    done(null, user);
                }else{
                    user = await User.create(newUser);
                    // send welcome mail
                    done(null, user);
                }
            }catch(err){
                // done(err, null);
                console.error(err);
            }
        }
    ));
}