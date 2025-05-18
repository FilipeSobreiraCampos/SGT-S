const Plano = require('../models/Plano.js')

// CRUD do PLANO
class PlanoController {
    static async ListarPlanos(req, res) {
        try {
            const planos = await Plano.findAll();
            res.status(200).json(planos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async CriarPlano(req, res) {
        const dadosPlano = req.body;
        try {
            const planoCriado = await Plano.create(dadosPlano);
            res.status(201).json(planoCriado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async ExcluirPlano(req, res) {
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

    static async EditarPlano(req, res) {
        const { id } = req.params;
        const { nome, descricao, dataInicio, dataFim, status, tipoTeste } = req.body;
        try {
            const plano = await Plano.findByPk(id);
            if (!plano) {
                return res.status(404).json({ message: 'Plano não encontrado' });
            }
            await plano.update({ nome, descricao, dataInicio, dataFim, status, tipoTeste });
            res.status(200).json({ message: 'Plano atualizado com sucesso', plano });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PlanoController;
