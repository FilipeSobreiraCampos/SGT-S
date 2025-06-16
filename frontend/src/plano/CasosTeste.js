import React, { useState, useEffect } from 'react';
import { Paper, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';

const CasosTeste = () => {
  const [testes, setTestes] = useState([]);
  const [planos, setPlanos] = useState([]);
  const [form, setForm] = useState({ nome: '', descricao: '', dataExecucao: '', resultado: '', status: '', plano_id: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    buscarTestes();
    buscarPlanos();
  }, []);

  const buscarTestes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/teste/consultar');
      setTestes(response.data);
    } catch (error) {
      console.error('Erro ao buscar testes:', error);
    }
  };

  const buscarPlanos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/plano/consultar');
      setPlanos(response.data);
    } catch (error) {
      console.error('Erro ao buscar planos:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (editId) {
        await axios.put(`http://localhost:3001/teste/editar/${editId}`, form);
      } else {
        await axios.post('http://localhost:3001/teste/criar', form);
      }
      setForm({ nome: '', descricao: '', dataExecucao: '', resultado: '', status: '', plano_id: '' });
      setEditId(null);
      buscarTestes();
    } catch (error) {
      console.error('Erro ao salvar o teste:', error);
    }
  };

  const handleEdit = (teste) => {
    setForm({
      nome: teste.nome,
      descricao: teste.descricao,
      dataExecucao: teste.dataExecucao,
      resultado: teste.resultado,
      status: teste.status,
      plano_id: teste.plano_id
    });
    setEditId(teste.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/teste/deletar/${id}`);
      buscarTestes();
    } catch (error) {
      console.error('Erro ao excluir o teste:', error);
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
          Gerenciamento de Casos de Teste
        </Typography>

        <Divider sx={{ my: 2 }} />

        <TextField
          label="Nome do Teste"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          fullWidth sx={{ mb: 2 }}
        />
        <TextField
          label="Descrição"
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          fullWidth sx={{ mb: 2 }}
        />
        <TextField
          label="Data de Execução"
          name="dataExecucao"
          type="date"
          value={form.dataExecucao}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Resultado"
          name="resultado"
          value={form.resultado}
          onChange={handleChange}
          fullWidth sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={form.status}
            onChange={handleChange}
            label="Status"
          >
            <MenuItem value="Executado">Executado</MenuItem>
            <MenuItem value="Não Executado">Não Executado</MenuItem>
          </Select>
        </FormControl>


        {/* Dropdown de Planos */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Plano</InputLabel>
          <Select
            name="plano_id"
            value={form.plano_id}
            onChange={handleChange}
            label="Plano"
          >
            {planos.map((plano) => (
              <MenuItem key={plano.id} value={plano.id}>
                {plano.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


        <Button variant="contained" onClick={handleSave} sx={{ mb: 2 }}>
          {editId ? 'Atualizar Teste' : 'Adicionar Teste'}
        </Button>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nome</strong></TableCell>
                <TableCell><strong>Descrição</strong></TableCell>
                <TableCell><strong>Data Execução</strong></TableCell>
                <TableCell><strong>Resultado</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Plano</strong></TableCell>
                <TableCell><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testes.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.nome}</TableCell>
                  <TableCell>{t.descricao}</TableCell>
                  <TableCell>
                    {t.dataExecucao ? new Date(t.dataExecucao).toLocaleDateString('pt-BR') : ''}
                  </TableCell>
                  <TableCell>{t.resultado}</TableCell>
                  <TableCell>{t.status}</TableCell>
                  <TableCell>{planos.find(plano => plano.id === t.plano_id)?.nome || '—'}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(t)}>Editar</Button>
                    <Button onClick={() => handleDelete(t.id)}>Excluir</Button>
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

export default CasosTeste;
