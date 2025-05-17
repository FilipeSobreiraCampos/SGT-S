import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip, TableContainer, Button} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';


const PlanoList = () => {
    const [planos, setPlanos] = useState([]);

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
                  <Tooltip title="Editar">
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton color="error">
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default PlanoList;
