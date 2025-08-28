const GameModel = require("../models/game")

const GameService = {
    addGame: async (userId, score, moves, duration) => {
        return await GameModel.addGame(userId, score, moves, duration)
    },

    getUserGames: async (userId) => {
        return await GameModel.getUserGames(userId)
    },

    getLeaderboard: async (limit = 10) => {
        return await GameModel.getLeaderboard(limit)
    }
}

module.exports = GameService
