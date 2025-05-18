import React, { useState, useEffect } from 'react';
import { Paper, Typography, Divider, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';



const EditarPlano = () => {
  const { id } = useParams(); // pega o id da URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    dataInicio: '',
    dataFim: '',
    tipoTeste: '',
    status: ''
  });

  useEffect(() => {
    // Buscar os dados do plano para preencher o formulário
    const fetchPlano = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/plano/consultar`);
        const plano = response.data.find(p => p.id === Number(id));
        if (plano) {
          setForm(plano);
        } else {
          alert('Plano não encontrado');
          navigate('/'); // ou para lista de planos
        }
      } catch (error) {
        console.error('Erro ao buscar plano:', error);
      }
    };

    fetchPlano();
  }, [id, navigate]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdatePlano = async () => {
    try {
      await axios.put(`http://localhost:3001/plano/editar/${id}`, form);
      alert('Plano atualizado com sucesso!');
      navigate('/plano/lista'); // ou onde estiver a lista
    } catch (error) {
      console.error('Erro ao atualizar plano:', error);
      alert('Erro ao atualizar plano');
    }
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
          Editar Plano de Teste
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
          label="Data Inicio"
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
        <Button variant="contained" onClick={handleUpdatePlano}>
          Salvar Alterações
        </Button>
      </Paper>
    </motion.div>
  );
};

export default EditarPlano;
