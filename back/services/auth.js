const UserModel = require("../models/users")

var register = function(body)
{
    return UserModel.register(body.name, body.email, body.password);
}

var getJwt = function(user)
{
    return user.generateJwt();
}

module.exports = {
    register,
    getJwt
}