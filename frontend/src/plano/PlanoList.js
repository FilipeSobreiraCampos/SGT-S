import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Menu,
  MenuItem,
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  TableContainer
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';  // <-- Importa useNavigate

const PlanoList = () => {
  const [planos, setPlanos] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [planoSelecionado, setPlanoSelecionado] = useState(null);
  const navigate = useNavigate();  // <-- Cria o navigate
  const formatarData = (dataISO) => {
  if (!dataISO) return '';
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
};


  // Carrega os planos ao iniciar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/plano/consultar");
        setPlanos(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };
    fetchData();
  }, []);

  // Abertura do menu contextual
  const handleMenuClick = (event, plano) => {
    setAnchorEl(event.currentTarget);
    setPlanoSelecionado(plano);
  };

  // Fecha o menu
  const handleMenuClose = () => {
    setAnchorEl(null);
    setPlanoSelecionado(null);
  };

  // Exclusão do plano
  const handleExcluir = async () => {
    if (!planoSelecionado) return;

    const confirmar = window.confirm(`Tem certeza que deseja excluir o plano "${planoSelecionado.nome}"?`);
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:3001/plano/deletar/${planoSelecionado.id}`);
      // Remove o plano da lista
      setPlanos(prevPlanos => prevPlanos.filter(plano => plano.id !== planoSelecionado.id));
      console.log("Plano excluído com sucesso:", planoSelecionado.id);
    } catch (error) {
      console.error("Erro ao excluir o plano:", error);
    } finally {
      handleMenuClose(); // Fecha o menu
    }
  };

  // Redireciona para a rota de edição do plano
  const handleEditar = () => {
    if (!planoSelecionado) return;
    navigate(`/plano/editar/${planoSelecionado.id}`);
    handleMenuClose();
  };

  const  handleDocumentacao = () => {
    if (!planoSelecionado) return;
    navigate(`/plano/documentacao/${planoSelecionado.id}`);
    handleMenuClose();
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      sx={{ p: 3 }}
    >
      <Typography variant="h5" gutterBottom>
        Lista de Planos de Teste
      </Typography>

      <Paper elevation={3} sx={{ mt: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nome</strong></TableCell>
                <TableCell><strong>Descrição</strong></TableCell>
                <TableCell><strong>Data Início</strong></TableCell>
                <TableCell><strong>Data Fim</strong></TableCell>
                <TableCell><strong>Tipo de Teste</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell align="center"><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planos.map((plano) => (
                <TableRow key={plano.id}>
                  <TableCell>{plano.nome}</TableCell>
                  <TableCell>{plano.descricao}</TableCell>
                  <TableCell>{formatarData(plano.dataInicio)}</TableCell>
                  <TableCell>{formatarData(plano.dataFim)}</TableCell>
                  <TableCell>{plano.tipoTeste}</TableCell>
                  <TableCell>{plano.status}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Mais Opções">
                      <IconButton
                        color="error"
                        onClick={(e) => handleMenuClick(e, plano)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDocumentacao}>Documentação</MenuItem>
        <MenuItem onClick={handleEditar}>Execução</MenuItem>
        <MenuItem onClick={handleEditar}>Parâmetros do Plano</MenuItem>
        <MenuItem onClick={handleEditar}>Editar</MenuItem>
        <MenuItem onClick={handleExcluir}>Excluir</MenuItem>
      </Menu>
    </Box>
  );
};

export default PlanoList;
