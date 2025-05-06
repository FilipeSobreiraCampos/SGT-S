import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';

// Sample data
const mockPlanos = [
  { id: 'PL001', nome: 'Plano de Teste - Portal Web', sistema: 'Portal de Clientes', versao: '1.2', status: 'Ativo', dataCriacao: '15/01/2025' },
  { id: 'PL002', nome: 'Plano de Teste - API de Pagamentos', sistema: 'Sistema de Pagamentos', versao: '2.0', status: 'Em Revisão', dataCriacao: '20/01/2025' },
  { id: 'PL003', nome: 'Plano de Teste - Login e Autenticação', sistema: 'Portal de Clientes', versao: '1.0', status: 'Concluído', dataCriacao: '05/02/2025' },
  { id: 'PL004', nome: 'Plano de Teste - Módulo Financeiro', sistema: 'ERP', versao: '3.1', status: 'Ativo', dataCriacao: '10/02/2025' },
  { id: 'PL005', nome: 'Plano de Teste - App Mobile', sistema: 'Aplicativo Mobile', versao: '2.4', status: 'Em Desenvolvimento', dataCriacao: '18/02/2025' },
];

const PlanoList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredPlanos = mockPlanos.filter(plano => 
    plano.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plano.sistema.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plano.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Ativo': return 'success';
      case 'Em Revisão': return 'warning';
      case 'Concluído': return 'info';
      case 'Em Desenvolvimento': return 'primary';
      default: return 'default';
    }
  };

  const handleEditPlano = (id) => {
    navigate(`/plano/documentacao?id=${id}`);
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          placeholder="Buscar planos..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <IconButton color="primary">
          <FilterIcon />
        </IconButton>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Sistema</TableCell>
              <TableCell>Versão</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data de Criação</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPlanos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((plano) => (
                <TableRow key={plano.id} hover>
                  <TableCell>{plano.id}</TableCell>
                  <TableCell>{plano.nome}</TableCell>
                  <TableCell>{plano.sistema}</TableCell>
                  <TableCell>{plano.versao}</TableCell>
                  <TableCell>
                    <Chip 
                      label={plano.status} 
                      color={getStatusColor(plano.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{plano.dataCriacao}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="primary" onClick={() => handleEditPlano(plano.id)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="info">
                      <ViewIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {filteredPlanos.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Nenhum plano encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredPlanos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      </TableContainer>
    </Box>
  );
};

export default PlanoList;