import React, { useState } from 'react';
import { Paper, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';

const CasosTeste = () => {
  const [testes, setTestes] = useState([
    { id: 1, nome: 'Teste de Login', plano: 'Plano A', resultado: 'Aprovado' },
    { id: 2, nome: 'Teste de Cadastro', plano: 'Plano B', resultado: 'Reprovado' },
  ]);

  const [form, setForm] = useState({ nome: '', plano: '', resultado: '' });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (editId) {
      setTestes(testes.map(t => (t.id === editId ? { ...form, id: editId } : t)));
      setEditId(null);
    } else {
      setTestes([...testes, { ...form, id: testes.length + 1 }]);
    }
    setForm({ nome: '', plano: '', resultado: '' });
  };

  const handleEdit = (id) => {
    const teste = testes.find(t => t.id === id);
    setForm(teste);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setTestes(testes.filter(t => t.id !== id));
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
          Gerenciamento de Testes
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
          label="Plano Relacionado"
          name="plano"
          value={form.plano}
          onChange={handleChange}
          fullWidth sx={{ mb: 2 }}
        />
        <TextField
          label="Resultado Esperado"
          name="resultado"
          value={form.resultado}
          onChange={handleChange}
          fullWidth sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleSave} sx={{ mb: 2 }}>
          {editId ? 'Atualizar Teste' : 'Adicionar Teste'}
        </Button>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nome</strong></TableCell>
                <TableCell><strong>Plano</strong></TableCell>
                <TableCell><strong>Resultado</strong></TableCell>
                <TableCell><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testes.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.nome}</TableCell>
                  <TableCell>{t.plano}</TableCell>
                  <TableCell>{t.resultado}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(t.id)}>Editar</Button>
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
