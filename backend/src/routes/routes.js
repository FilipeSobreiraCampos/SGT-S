const express = require('express');
const { CriarPlano } = require('../controllers/PlanoController');
const PlanoController = require('../controllers/PlanoController');

// Página de rotas

const routes = (app) => {
    app.use(express.json());

    //Rotas do plano
    app.post('/plano/criar', PlanoController.CriarPlano);
    app.get('/plano/consultar', PlanoController.ListarPlanos);
    app.delete('/plano/deletar/:id', PlanoController.ExcluirPlano);


};

module.exports = routes;
