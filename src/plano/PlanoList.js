import React from 'react';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';

const planosMock = [
  { id: 1, nome: 'Plano de Teste A', sistema: 'SGT-S', responsavel: 'Maria' },
  { id: 2, nome: 'Plano de Teste B', sistema: 'SGT-S', responsavel: 'João' },
];

const PlanoList = () => {
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Nome do Plano</strong></TableCell>
              <TableCell><strong>Sistema</strong></TableCell>
              <TableCell><strong>Responsável</strong></TableCell>
              <TableCell align="center"><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {planosMock.map((plano) => (
              <TableRow key={plano.id}>
                <TableCell>{plano.id}</TableCell>
                <TableCell>{plano.nome}</TableCell>
                <TableCell>{plano.sistema}</TableCell>
                <TableCell>{plano.responsavel}</TableCell>
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
      </Paper>
    </Box>
  );
};

export default PlanoList;
