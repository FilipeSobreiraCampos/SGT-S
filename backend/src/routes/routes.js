const express = require('express');
const { CriarPlano } = require('../controllers/PlanoController');
const PlanoController = require('../controllers/PlanoController');
const SistemaController = require('../controllers/SistemaController');

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


};

module.exports = routes;
