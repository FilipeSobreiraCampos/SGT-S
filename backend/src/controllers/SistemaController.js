const Sistema = require("../models/Sistema");

class SistemaController {
        static async ListarSistemas(req, res) {
            try {
                const sistemas = await Sistema.findAll();
                res.status(200).json(sistemas);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }

        static async CriarSistema(req, res) {
                const dadosSistema = req.body;
                try {
                    const sistemaCriado = await Plano.create(dadosSistema);
                    res.status(201).json(sistemaCriado);
                } catch (error) {
                    res.status(500).json({ error: error.message });
                }
            }

}

module.exports = SistemaController;