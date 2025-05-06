// GerenciamentoUsuario.js
import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const GerenciamentoUsuario = () => {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'Ana Costa', email: 'ana@email.com', perfil: 'Administrador' },
    { id: 2, nome: 'Bruno Silva', email: 'bruno@email.com', perfil: 'Testador' },
    { id: 3, nome: 'Carla Oliveira', email: 'carla@email.com', perfil: 'Programador' },
  ]);

  const [novoUsuario, setNovoUsuario] = useState({ nome: '', email: '', perfil: '' });
  const [editandoId, setEditandoId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoUsuario({ ...novoUsuario, [name]: value });
  };

  const handleSalvar = () => {
    if (editandoId) {
      setUsuarios(
        usuarios.map((usuario) =>
          usuario.id === editandoId ? { ...usuario, ...novoUsuario } : usuario
        )
      );
      setEditandoId(null);
    } else {
      const novoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
      setUsuarios([...usuarios, { ...novoUsuario, id: novoId }]);
    }
    setNovoUsuario({ nome: '', email: '', perfil: '' });
  };

  const handleEditar = (usuario) => {
    setNovoUsuario(usuario);
    setEditandoId(usuario.id);
  };

  const handleExcluir = (id) => {
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
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
          Gerenciamento de Usuários
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Abaixo estão listados usuários do sistema e seus respectivos perfis de acesso.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nome</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Perfil</strong></TableCell>
                <TableCell><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.nome}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.perfil}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditar(usuario)}><EditIcon /></IconButton>
                    <IconButton onClick={() => handleExcluir(usuario.id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" sx={{ mt: 4 }}>
          {editandoId ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
        </Typography>

        <form style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <TextField
            name="nome"
            label="Nome"
            value={novoUsuario.nome}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="email"
            label="Email"
            value={novoUsuario.email}
            onChange={handleChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Perfil</InputLabel>
            <Select
              name="perfil"
              value={novoUsuario.perfil}
              onChange={handleChange}
              label="Perfil"
            >
              <MenuItem value="Administrador">Administrador</MenuItem>
              <MenuItem value="Testador">Testador</MenuItem>
              <MenuItem value="Programador">Programador</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleSalvar} sx={{ height: '56px' }}>
            {editandoId ? 'Atualizar' : 'Salvar'}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          * Estes dados são simulados apenas para demonstração da interface.
        </Typography>
      </Paper>
    </motion.div>
  );
};

export default GerenciamentoUsuario;
