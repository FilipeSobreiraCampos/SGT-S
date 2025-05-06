import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  Avatar,
  Tooltip,
  FormControlLabel,
  Switch,
  InputAdornment
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  //MoreVert as MoreVertIcon,
  PersonAdd as PersonAddIcon,
  Key as KeyIcon
} from '@mui/icons-material';

// Mock data
const mockUsers = [
  { id: 1, nome: 'Ana Silva', email: 'ana.silva@exemplo.com', cargo: 'Gerente de Testes', perfil: 'Administrador', status: 'Ativo', ultimoAcesso: '21/02/2025 10:23' },
  { id: 2, nome: 'Carlos Mendes', email: 'carlos.mendes@exemplo.com', cargo: 'Testador Sênior', perfil: 'Testador', status: 'Ativo', ultimoAcesso: '20/02/2025 15:45' },
  { id: 3, nome: 'Mariana Costa', email: 'mariana.costa@exemplo.com', cargo: 'Analista de QA', perfil: 'Testador', status: 'Inativo', ultimoAcesso: '15/02/2025 09:10' },
  { id: 4, nome: 'Paulo Gomes', email: 'paulo.gomes@exemplo.com', cargo: 'Desenvolvedor', perfil: 'Visualizador', status: 'Ativo', ultimoAcesso: '21/02/2025 08:30' },
  { id: 5, nome: 'Luciana Ferreira', email: 'luciana.ferreira@exemplo.com', cargo: 'Gerente de Produto', perfil: 'Gerente', status: 'Ativo', ultimoAcesso: '19/02/2025 14:20' },
];

const Usuario = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cargo: '',
    perfil: 'Testador',
    status: true
  });

  // Handle dialog open/close
  const handleOpenDialog = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setFormData({
        nome: user.nome,
        email: user.email,
        cargo: user.cargo,
        perfil: user.perfil,
        status: user.status === 'Ativo'
      });
    } else {
      setSelectedUser(null);
      setFormData({
        nome: '',
        email: '',
        cargo: '',
        perfil: 'Testador',
        status: true
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenResetDialog = (user) => {
    setSelectedUser(user);
    setOpenResetDialog(true);
  };

  const handleCloseResetDialog = () => {
    setOpenResetDialog(false);
  };

  // Handle form changes
  const handleFormChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'status' ? checked : value
    });
  };

  // Handle save user
  const handleSaveUser = () => {
    if (selectedUser) {
      // Update existing user
      const updatedUsers = users.map(user => 
        user.id === selectedUser.id 
          ? { 
              ...user, 
              nome: formData.nome,
              email: formData.email,
              cargo: formData.cargo,
              perfil: formData.perfil,
              status: formData.status ? 'Ativo' : 'Inativo' 
            } 
          : user
      );
      setUsers(updatedUsers);
    } else {
      // Add new user
      const newUser = {
        id: users.length + 1,
        nome: formData.nome,
        email: formData.email,
        cargo: formData.cargo,
        perfil: formData.perfil,
        status: formData.status ? 'Ativo' : 'Inativo',
        ultimoAcesso: 'Nunca'
      };
      setUsers([...users, newUser]);
    }
    handleCloseDialog();
  };

  // Handle reset password
  const handleResetPassword = () => {
    // Simulate password reset
    handleCloseResetDialog();
  };

  // Handle delete user
  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // Handle search
  const filteredUsers = users.filter(user => 
    user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.cargo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Gerenciamento de Usuários</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Novo Usuário
        </Button>
      </Box>

      <Paper elevation={2} sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField
            placeholder="Buscar usuários..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Box>
            <Button 
              startIcon={<RefreshIcon />}
              size="small"
              onClick={() => setSearchTerm('')}
            >
              Limpar
            </Button>
          </Box>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Usuário</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Cargo</TableCell>
              <TableCell>Perfil</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Último Acesso</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                        {user.nome.charAt(0)}
                      </Avatar>
                      <Typography variant="body2">{user.nome}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.cargo}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.perfil} 
                      color={
                        user.perfil === 'Administrador' ? 'error' :
                        user.perfil === 'Gerente' ? 'warning' :
                        user.perfil === 'Testador' ? 'primary' : 'default'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={user.status} 
                      color={user.status === 'Ativo' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{user.ultimoAcesso}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Editar">
                      <IconButton size="small" color="primary" onClick={() => handleOpenDialog(user)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Redefinir senha">
                      <IconButton size="small" color="warning" onClick={() => handleOpenResetDialog(user)}>
                        <KeyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton size="small" color="error" onClick={() => handleDeleteUser(user.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      </TableContainer>

      {/* Add/Edit User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedUser ? 'Editar Usuário' : 'Novo Usuário'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="nome"
                label="Nome Completo"
                fullWidth
                value={formData.nome}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="cargo"
                label="Cargo"
                fullWidth
                value={formData.cargo}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Perfil de Acesso</InputLabel>
                <Select
                  name="perfil"
                  value={formData.perfil}
                  label="Perfil de Acesso"
                  onChange={handleFormChange}
                >
                  <MenuItem value="Administrador">Administrador</MenuItem>
                  <MenuItem value="Gerente">Gerente</MenuItem>
                  <MenuItem value="Testador">Testador</MenuItem>
                  <MenuItem value="Visualizador">Visualizador</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.status}
                    onChange={handleFormChange}
                    name="status"
                    color="success"
                  />
                }
                label="Usuário Ativo"
              />
            </Grid>
            {!selectedUser && (
              <Grid item xs={12}>
                <Typography variant="caption" color="text.secondary">
                  Será enviado um email com instruções para definição de senha.
                </Typography>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            onClick={handleSaveUser}
            variant="contained"
            startIcon={selectedUser ? <EditIcon /> : <PersonAddIcon />}
          >
            {selectedUser ? 'Atualizar' : 'Criar Usuário'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={openResetDialog} onClose={handleCloseResetDialog}>
        <DialogTitle>Redefinir Senha</DialogTitle>
        <DialogContent>
          <Typography>
            Deseja enviar um email para {selectedUser?.nome} com instruções para redefinição de senha?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResetDialog}>Cancelar</Button>
          <Button 
            onClick={handleResetPassword}
            variant="contained"
            color="warning"
          >
            Enviar Email
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Usuario;