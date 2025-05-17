const Plano = require('../models/Plano.js')

// CRUD do PLANO

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

     static async excluirPlano(req, res) {
        const { id } = req.params;        
        try {
            const deletado = await Plano.destroy({ where: { id } });
            if (deletado) {
                res.status(200).json({ message: 'Plano excluído com sucesso' });
            } else {
                res.status(404).json({ message: 'Plano não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PlanoController;
