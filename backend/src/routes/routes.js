const express = require('express');
const { CriarPlano } = require('../controllers/PlanoController');
const PlanoController = require('../controllers/PlanoController');

const routes = (app) => {
    app.use(express.json());

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.post('/plano/criar', PlanoController.CriarPlano);
    app.get('/plano/consultar', PlanoController.listAllRatings);


};

module.exports = routes;
