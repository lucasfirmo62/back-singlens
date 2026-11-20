const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth')
const authMiddleware = require('../middlewares/auth');

const User = require('../models/users');
const { model } = require('mongoose');

const router = express();

router.post('/register', async (req, res) => {
    const { email } = req.body

    try {
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: "Parece que o usuário já existe" })
        }

        const user = await User.create(req.body);

        user.password = undefined;

        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400
        })

        return res.send({ user, token });
    } catch (err) {
        return res.status(400).send({ error: 'Erro no registro' });
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(400).send({ error: 'Usuário não encontrado' })
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'A senha não está correta' })
    }

    user.password = undefined;

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400
    })

    res.send({ user, token })
})

function findUser(id) {
    return User.findOne({ id })
}

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findOne({ _id: id })

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Seguir um usuário: :id = quem está seguindo | targetId = quem será seguido
router.post('/follow/:id', async (req, res) => {
    const id = req.params.id
    const { targetId } = req.body

    if (!targetId || String(id) === String(targetId)) {
        return res.status(400).json({ message: 'ID alvo inválido' })
    }

    try {
        const currentUser = await User.findOne({ _id: id })
        const targetUser = await User.findOne({ _id: targetId })

        if (!currentUser || !targetUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        await User.updateOne(
            { _id: id },
            { $addToSet: { following: String(targetId) } }
        )

        await User.updateOne(
            { _id: targetId },
            { $addToSet: { followers: String(id) } }
        )

        const updatedUser = await User.findOne({ _id: id })

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Deixar de seguir um usuário: :id = quem está deixando de seguir | targetId = quem deixará de ser seguido
router.post('/unfollow/:id', async (req, res) => {
    const id = req.params.id
    const { targetId } = req.body

    if (!targetId) {
        return res.status(400).json({ message: 'ID alvo inválido' })
    }

    try {
        const currentUser = await User.findOne({ _id: id })
        const targetUser = await User.findOne({ _id: targetId })

        if (!currentUser || !targetUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        await User.updateOne(
            { _id: id },
            { $pull: { following: String(targetId) } }
        )

        await User.updateOne(
            { _id: targetId },
            { $pull: { followers: String(id) } }
        )

        const updatedUser = await User.findOne({ _id: id })

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.post('/watchlist/:id', async (req, res) => {
    const id = req.params.id
    const user = req.body

    try {
        const updateWatchlist = await User.updateOne({ _id: id }, user)

        if (updateWatchlist.matchedCount === 0) {
            res.status(422).json({ message: 'O usuário não foi encontrado' })
        }

        res.status(200).json(user)
    } catch {
        res.status(500).json({ error: error })
    }
})

router.post('/resume/:id', async (req, res) => {
    const id = req.params.id
    const user = req.body

    try {
        const updateWatchlist = await User.updateOne({ _id: id }, user)

        if (updateWatchlist.matchedCount === 0) {
            res.status(422).json({ message: 'O usuário não foi encontrado' })
        }

        res.status(200).json(user)
    } catch {
        res.status(500).json({ error: error })
    }
})

router.post('/cinewatch/:id', async (req, res) => {
    const id = req.params.id
    const user = req.body

    try {
        const updateWatchlist = await User.updateOne({ _id: id }, user)

        if (updateWatchlist.matchedCount === 0) {
            res.status(422).json({ message: 'O usuário não foi encontrado' })
        }

        res.status(200).json(user)
    } catch {
        res.status(500).json({ error: error })
    }
})

router.post('/cinewatchpresession/:id', async (req, res) => {
    const id = req.params.id
    const user = req.body

    try {
        const updateWatchlist = await User.updateOne({ _id: id }, user)

        if (updateWatchlist.matchedCount === 0) {
            res.status(422).json({ message: 'O usuário não foi encontrado' })
        }

        res.status(200).json(user)
    } catch {
        res.status(500).json({ error: error })
    }
})

router.get('/cinewatch/:idMovie', async (req, res) => {
    const idMovieCine = req.params.idMovie

    try {
        const user = await User.find({
            cineWatchMovieId: idMovieCine
        })

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = app => app.use('/auth', router);
