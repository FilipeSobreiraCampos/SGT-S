const Plano = require('../models/Plano.js')

class PlanoController {
    static async listAllRatings(req, res) {
        try {
            const ratings = await Rating.findAll();
            res.status(200).json(ratings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async CriarPlano(req, res) {

        const dadosPlano = req.body;
        res.send(await Plano.create(dadosPlano))

    }
}

module.exports = PlanoController;
