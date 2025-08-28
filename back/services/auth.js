const UserModel = require("../models/users")

var register = function(body)
{
    return UserModel.register(body.name, body.email, body.password);
}

var getJwt = function(user)
{
    return user.generateJwt();
}

var deleteUser = async function(userId) {
    await GameModel.deleteMany({ user: userId })
    return await UserModel.findByIdAndDelete(userId)
}

module.exports = {
    register,
    getJwt,
    deleteUser
}