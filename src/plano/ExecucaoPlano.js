// src/plano/ExecucaoPlano.js
import React, { useState } from 'react';
import { Paper, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { motion } from 'framer-motion';

const ExecucaoPlano = () => {
  const [execucoes, setExecucoes] = useState([
    { id: 1, plano: 'Plano A', responsavel: 'João', status: true },
    { id: 2, plano: 'Plano B', responsavel: 'Maria', status: false },
  ]);

  const [form, setForm] = useState({ plano: '', responsavel: '', status: false });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSave = () => {
    if (editId) {
      setExecucoes(execucoes.map(exec => (exec.id === editId ? { ...form, id: editId } : exec)));
      setEditId(null);
    } else {
      setExecucoes([...execucoes, { ...form, id: execucoes.length + 1 }]);
    }
    setForm({ plano: '', responsavel: '', status: false });
  };

  const handleEdit = (id) => {
    const execucao = execucoes.find(exec => exec.id === id);
    setForm(execucao);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setExecucoes(execucoes.filter(exec => exec.id !== id));
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
          Execução de Plano de Teste
        </Typography>

        <Divider sx={{ my: 2 }} />

        <TextField
          label="Plano"
          name="plano"
          value={form.plano}
          onChange={handleChange}
          fullWidth sx={{ mb: 2 }}
        />
        <TextField
          label="Responsável"
          name="responsavel"
          value={form.responsavel}
          onChange={handleChange}
          fullWidth sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="status"
              checked={form.status}
              onChange={handleChange}
            />
          }
          label="Executado"
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleSave} sx={{ mb: 2 }}>
          {editId ? 'Atualizar Execução' : 'Registrar Execução'}
        </Button>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Plano</strong></TableCell>
                <TableCell><strong>Responsável</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {execucoes.map((exec) => (
                <TableRow key={exec.id}>
                  <TableCell>{exec.plano}</TableCell>
                  <TableCell>{exec.responsavel}</TableCell>
                  <TableCell>{exec.status ? 'Executado' : 'Pendente'}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(exec.id)}>Editar</Button>
                    <Button onClick={() => handleDelete(exec.id)}>Excluir</Button>
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

export default ExecucaoPlano;

