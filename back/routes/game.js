const router = require("express").Router()
const passport = require("./config/auth")
const GameService = require("../services/game")

router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { score, moves, duration } = req.body
            if (score == null || moves == null || duration == null) {
                return res.status(400).json({ message: "Missing game data" })
            }
            const game = await GameService.addGame(req.user._id, score, moves, duration)
            res.status(201).json(game.summary())
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
)

router.get(
    "/my",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const games = await GameService.getUserGames(req.user._id)
            res.json(games.map(g => g.summary()))
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
)

router.get("/leaderboard", async (req, res) => {
    try {
        const leaderboard = await GameService.getLeaderboard(10)
        res.json(leaderboard)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router
