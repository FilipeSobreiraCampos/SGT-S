import React, { useState, useEffect } from 'react';
import { Paper, Typography, Divider, Button, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';

const CriarPlano = () => {
  const [planos, setPlanos] = useState([]);
  const [form, setForm] = useState({
    nome: '',
    dataInicio: '',
    dataFim: '',
    tipoTeste: '',
    descricao: '',
    sistema,'',
    status: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/plano/consultar');
        setPlanos(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };
    fetchData();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddPlano = async () => {
      try {
        const response = await axios.post('http://localhost:3001/plano/criar', form);
        setPlanos([...planos, response.data]);
      } catch (error) {
        console.error('Erro ao criar o plano:', error);
      }
    
    setForm({
      nome: '',
      descricao: '',
      dataInicio: '',
      dataFim: '',
      tipoTeste: '',
      status: '',
    });
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
          Criar Planos de Teste
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Abaixo estão listados os planos de teste existentes. Você pode adicionar novos planos.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <TextField
          label="Nome do Plano"
          name="nome"
          value={form.nome}
          onChange={handleFormChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Descrição"
          name="descricao"
          value={form.descricao}
          onChange={handleFormChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Data Início"
          name="dataInicio"
          type="date"
          value={form.dataInicio}
          onChange={handleFormChange}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Data Fim"
          name="dataFim"
          type="date"
          value={form.dataFim}
          onChange={handleFormChange}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Tipo de Teste"
          name="tipoTeste"
          value={form.tipoTeste}
          onChange={handleFormChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Status"
          name="status"
          value={form.status}
          onChange={handleFormChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleAddPlano}
          sx={{ mb: 2 }}
        >
          {editMode ? 'Editar Plano' : 'Adicionar Plano'}
        </Button>
      </Paper>
    </motion.div>
  );
};

export default CriarPlano;
