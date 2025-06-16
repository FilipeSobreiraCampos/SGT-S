const Teste = require('../models/Teste.js');
const Plano = require('../models/Plano.js');

class TesteController {
    // Listar todos os Testes
    static async ListarTestes(req, res) {
        try {
            const testes = await Teste.findAll({ include: Plano });
            res.status(200).json(testes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Criar um novo Teste
    static async CriarTeste(req, res) {
        const dadosTeste = req.body;
        try {
            const testeCriado = await Teste.create(dadosTeste);
            res.status(201).json(testeCriado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Excluir um Teste
    static async ExcluirTeste(req, res) {
        const { id } = req.params;
        try {
            const deletado = await Teste.destroy({ where: { id } });
            if (deletado) {
                res.status(200).json({ message: 'Teste excluído com sucesso' });
            } else {
                res.status(404).json({ message: 'Teste não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Editar um Teste
    static async EditarTeste(req, res) {
        const { id } = req.params;
        const { nome, descricao, dataExecucao, resultado, status, plano_id } = req.body;
        try {
            const teste = await Teste.findByPk(id);
            if (!teste) {
                return res.status(404).json({ message: 'Teste não encontrado' });
            }
            await teste.update({ nome, descricao, dataExecucao, resultado, status, plano_id });
            res.status(200).json({ message: 'Teste atualizado com sucesso', teste });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = TesteController;
