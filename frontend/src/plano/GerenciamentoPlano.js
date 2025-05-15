import React, { useState, useEffect } from 'react';
import { Paper, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';



const GerenciamentoPlano = () => {
    
  const [planos, setPlanos] = useState([]);
  const [form, setForm] = useState({ nome: '', dataInicio: '', dataFim: '', tipoTeste: '', descricao: '', status: '' });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/plano/consultar");
        console.log('response:', response)
        setPlanos(response.data);  
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };
  
    fetchData();
  }, []);   

    useEffect(() => {
      console.log('planos:',planos);
    }, [planos]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddPlano = async () => {
    if (editMode) {
      const updatedPlanos = planos.map((plano) =>
        plano.id === editId ? { ...plano, ...form } : plano
      );
      setPlanos(updatedPlanos);
      setEditMode(false);
      setEditId(null);
    } else {
      const newPlano = { ...form};
      try{
        await axios.post("http://localhost:3001/plano/criar", newPlano)

      }catch(error) {
        console.error("Erro ao buscar os dados:", error);
      }
      setPlanos([...planos, newPlano]);
    }
    setForm({ nome: '', descricao: '', status: '' });
  };

  const handleEditPlano = (id) => {
    const planoToEdit = planos.find((plano) => plano.id === id);
    setForm(planoToEdit);
    setEditMode(true);
    setEditId(id);
  };

  const handleDeletePlano = (id) => {
    const updatedPlanos = planos.filter((plano) => plano.id !== id);
    setPlanos(updatedPlanos);
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
          Gerenciamento de Planos de Teste
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Abaixo estão listados os planos de teste existentes. Você pode adicionar, editar ou excluir planos.
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
          value={form.dataInicio}
          onChange={handleFormChange}
          fullWidth
          sx={{ mb: 2 }}
        />
           <TextField
          label="Data Fim"
          name="dataFim"
          value={form.dataFim}
          onChange={handleFormChange}
          fullWidth
          sx={{ mb: 2 }}
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

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nome</strong></TableCell>
                <TableCell><strong>Descrição</strong></TableCell>
                <TableCell><strong>Data Inicio</strong></TableCell>
                <TableCell><strong>Data Fim</strong></TableCell>
                <TableCell><strong>Tipo de Teste</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planos.map((plano) => (
                <TableRow key={plano.id}>
                  <TableCell>{plano.nome}</TableCell>
                  <TableCell>{plano.descricao}</TableCell>
                  <TableCell>{plano.dataInicio}</TableCell>
                  <TableCell>{plano.dataFim}</TableCell>
                  <TableCell>{plano.tipoTeste}</TableCell>
                  <TableCell>{plano.status}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditPlano(plano.id)}>Editar</Button>
                    <Button onClick={() => handleDeletePlano(plano.id)}>Excluir</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </motion.div>
  );
};

export default GerenciamentoPlano;
