var passport = require("passport")
var passportJwt = require("passport-jwt")
var LocalStrategy = require("passport-local").Strategy
var UserModel = require("../../models/users")
var config = require("../../config")

localOptions = {
    usernameField: "email"
}

passport.use(new LocalStrategy(localOptions, async function(email, password, done){

    var user = await UserModel.findOne({email:email})

    if (!user){
        done(null, null, {message: "Credentials not valid"});
    }
    else
    {
        var validacija = user.validatePassword(password)

        if (validacija){
            done(null, user)
        }
        else{
            done(null, null, {message: "Credentials not valid"});
        }
    }
}))

jwtOptions = {
    secretOrKey: config.secretKey,
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
}

passport.use(new passportJwt.Strategy(jwtOptions, async function(payload,done){
    var user = await UserModel.findOne({_id: payload._id})

    if (!user)
    {
        done(null, null, {message: "User authorization failed."})
    }
    else{
        done(null, user)
    }
    //var user = await UserModel.findById(payload._id)
}))

passport.autorizeRoles = (...roles)=>(req,res,next)=>{
    
    var validno = roles.find(role=> role === req.user.getRole())

    if (validno)
    {
        req.role = req.user.getRole()
        next()
    }
    else{
        res.status(403)
        res.send("Not Authorized")
    }
}

module.exports = passport
