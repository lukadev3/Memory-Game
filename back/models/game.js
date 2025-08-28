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
  const games = await this.find()
    .populate("user", "name email") 
    .lean()

  const scoresByUser = {}

  games.forEach(g => {
    if (!g.user) return 
    
    const rankingScore = (g.score * 100) - (g.duration * 0.5) - (g.moves * 2)

    if (!scoresByUser[g.user._id]) {
      scoresByUser[g.user._id] = {
        userId: g.user._id,
        name: g.user.name,
        email: g.user.email,
        totalRankingScore: 0,
        gamesPlayed: 0
      }
    }

    scoresByUser[g.user._id].totalRankingScore += rankingScore
    scoresByUser[g.user._id].gamesPlayed += 1
  })

  let leaderboard = Object.values(scoresByUser).map(u => ({
    ...u,
    avgRankingScore: u.totalRankingScore / u.gamesPlayed
  }))

  leaderboard.sort((a, b) => b.totalRankingScore - a.totalRankingScore)

  return leaderboard.slice(0, limit)
}


var GameModel = mongoose.model("game", GameSchema)
module.exports = GameModel
