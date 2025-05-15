const Plano = require('../models/Plano.js')

class PlanoController {
    static async listAllRatings(req, res) {
        try {
            const planos = await Plano.findAll();
            res.status(200).json(planos);
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
