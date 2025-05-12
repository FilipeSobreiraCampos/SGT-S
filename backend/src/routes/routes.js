const express = require('express');

const routes = (app) => {
    app.use(express.json());

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

};

module.exports = routes;
