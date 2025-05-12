import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Paper
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
// Corrigindo os caminhos de importação
import DocumentacaoPlano from './DocumentacaoPlano';
import ExecucaoPlano from './ExecucaoPlano';
import ConfiguracaoTeste from './ConfiguracaoTeste';
import GerenciamentoPlano from './GerenciamentoPlano';
import PlanoList from './PlanoList';

const Plano = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    const paths = ['', '/documentacao', '/execucao', '/configuracao', '/gerenciamento'];
    navigate(`/plano${paths[newValue]}`);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Planos de Teste</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => navigate('/plano/documentacao?new=true')}
        >
          Novo Plano
        </Button>
      </Box>

      <Paper elevation={2} sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Lista de Planos" />
          <Tab label="Documentação" />
          <Tab label="Execução" />
          <Tab label="Configuração" />
          <Tab label="Gerenciamento" />
        </Tabs>
      </Paper>

      <Routes>
        <Route path="/lista" element={<PlanoList />} />
        <Route path="/documentacao" element={<DocumentacaoPlano />} />
        <Route path="/execucao" element={<ExecucaoPlano />} />
        <Route path="/configuracao" element={<ConfiguracaoTeste />} />
        <Route path="/gerenciamento" element={<GerenciamentoPlano />} />
      </Routes>
    </Box>
  );
};

export default Plano;
