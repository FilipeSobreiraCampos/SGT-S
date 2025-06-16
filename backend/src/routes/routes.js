const express = require('express');
const PlanoController = require('../controllers/PlanoController');
const SistemaController = require('../controllers/SistemaController');
const TesteController = require('../controllers/TesteController');

// Página de rotas

const routes = (app) => {
    app.use(express.json());

    //Rotas do plano
    app.post('/plano/criar', PlanoController.CriarPlano); // Criar um plano
    app.get('/plano/consultar', PlanoController.ListarPlanos); // Lista todos os planos
    app.delete('/plano/deletar/:id', PlanoController.ExcluirPlano); // Deleta um plano em específico
    app.put('/plano/editar/:id', PlanoController.EditarPlano); //Edita um plano em específico

    //Rotas do Sistemma

    app.get('/sistemas/consultar', SistemaController.ListarSistemas) // Lista todos os sistemas

    //Rotas da Documentação

    //Rotas de Teste

    app.post('/teste/criar', TesteController.CriarTeste); // Criar um teste
    app.get('/teste/consultar', TesteController.ListarTestes); // Lista todos os testes
    app.delete('/teste/deletar/:id', TesteController.ExcluirTeste); // Deleta um teste específico
    app.put('/teste/editar/:id', TesteController.EditarTeste); // Edita um teste específico

};

module.exports = routes;
