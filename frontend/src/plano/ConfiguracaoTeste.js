// src/plano/ConfiguracaoTeste.js
import React, { useState } from 'react';
import { Paper, Typography, Divider, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { motion } from 'framer-motion';

const ConfiguracaoTeste = () => {
  const [configuracao, setConfiguracao] = useState({
    nome: '',
    descricao: '',
    parametros: '',
    criterios: '',
    dadosEntrada: '',
    status: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setConfiguracao({
      ...configuracao,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = () => {
    console.log(configuracao);
    // Lógica de salvar a configuração do teste
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.4 }}
    >
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Configuração do Teste
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Configure os parâmetros de execução, critérios de aceitação e dados de entrada dos testes utilizando os exemplos abaixo.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <TextField
          label="Nome do Teste"
          name="nome"
          value={configuracao.nome}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Descrição"
          name="descricao"
          value={configuracao.descricao}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Parâmetros"
          name="parametros"
          value={configuracao.parametros}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Critérios de Aceitação"
          name="criterios"
          value={configuracao.criterios}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Dados de Entrada"
          name="dadosEntrada"
          value={configuracao.dadosEntrada}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={configuracao.status}
              onChange={handleChange}
              name="status"
            />
          }
          label="Ativar Teste"
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Salvar Configuração
        </Button>
      </Paper>
    </motion.div>
  );
};

export default ConfiguracaoTeste;
