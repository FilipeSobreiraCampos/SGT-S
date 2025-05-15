const express = require('express');
const routes = require('./src/routes/routes.js');
const sequelize = require('./src/config/database.js');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors({
    origin: 'http://localhost:3000'
}));

// Testando a conexão com o banco de dados
sequelize.authenticate()
    .then(() => console.log('Conectado no Banco com Sucesso!'))
    .catch(err => console.error('Erro na Conexão com o banco', err));

routes(app);

app.listen(port, () => {
    console.log(`Servidor funcionando na porta ${port}`);
});
