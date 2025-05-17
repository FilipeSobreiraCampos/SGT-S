import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Menu,MenuItem, Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip, TableContainer, Button} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const PlanoList = () => {
    const [planos, setPlanos] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [planoSelecionado, setPlanoSelecionado] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:3001/plano/consultar");
          console.log('planos recebidos:', response.data);
          console.log('response.data:', response.data);
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
      
      const handleMenuClick = (event, plano) => {
    setAnchorEl(event.currentTarget); // Define onde o menu será ancorado (onde clicou)
    setPlanoSelecionado(plano);       // Guarda qual plano foi clicado
  };

  // Fechar menu
  const handleMenuClose = () => {
    setAnchorEl(null);                // Fecha o menu
    setPlanoSelecionado(null);       // Limpa a seleção
  };

  // Ações
  const handleEditar = () => {
    console.log("Editar plano:", planoSelecionado);
    handleMenuClose(); // Fecha o menu depois da ação
  };

  const handleExcluir = () => {
    console.log("Excluir plano:", planoSelecionado);
    handleMenuClose(); // Fecha o menu depois da ação
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
                <TableCell><strong>Data Inicio</strong></TableCell>
                <TableCell><strong>Data Fim</strong></TableCell>
                <TableCell><strong>Tipo de Teste</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell  align="center"><strong>Ações</strong></TableCell>
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
        <MenuItem onClick={handleEditar}>Documentação</MenuItem>
        <MenuItem onClick={handleEditar}>Sistema</MenuItem>
        <MenuItem onClick={handleEditar}>Execução</MenuItem>
        <MenuItem onClick={handleEditar}>Parametros do Plano</MenuItem>
        <MenuItem onClick={handleEditar}>Editar</MenuItem>
        <MenuItem onClick={handleExcluir}>Excluir</MenuItem>
      </Menu>
    </Box>
  );
};

export default PlanoList;
