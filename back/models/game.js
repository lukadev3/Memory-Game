const mongoose = require("mongoose")

var GameSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    score: { type: Number, required: true },
    moves: { type: Number, required: true },
    duration: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
})

GameSchema.methods.summary = function() {
    return {
        id: this._id,
        user: this.user,
        score: this.score,
        moves: this.moves,
        duration: this.duration,
        createdAt: this.createdAt
    }
}

GameSchema.statics.addGame = async function(userId, score, moves, duration) {
    const game = new this({ user: userId, score, moves, duration })
    return await game.save()
}

GameSchema.statics.getUserGames = async function(userId) {
    return await this.find({ user: userId }).sort({ createdAt: -1 })
}

GameSchema.statics.getLeaderboard = async function(limit = 10) {
    return await this.aggregate([
        {
            $group: {
                _id: "$user",
                totalScore: { $sum: "$score" },
                gamesPlayed: { $sum: 1 },
                avgScore: { $avg: "$score" }
            }
        },
        { $sort: { totalScore: -1 } },
        { $limit: limit },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "user"
            }
        },
        { $unwind: "$user" },
        {
            $project: {
                _id: 0,
                userId: "$user._id",
                name: "$user.name",
                email: "$user.email",
                totalScore: 1,
                gamesPlayed: 1,
                avgScore: 1
            }
        }
    ])
}

var GameModel = mongoose.model("game", GameSchema)
module.exports = GameModel
