import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Paper
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import DocumentacaoPlano from './DocumentacaoPlano';
import ExecucaoPlano from './ExecucaoPlano';
import ConfiguracaoTeste from './ConfiguracaoTeste';
import GerenciamentoPlano from './GerenciamentoPlano';
import PlanoList from './PlanoList';

const Plano = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabValue, setTabValue] = React.useState(0);

  const tabPaths = ['/plano/lista', '/plano/documentacao', '/plano/execucao', '/plano/configuracao', '/plano/gerenciamento'];

  // Atualiza a aba com base na URL
  React.useEffect(() => {
    const currentIndex = tabPaths.findIndex(path => location.pathname.startsWith(path));
    setTabValue(currentIndex === -1 ? 0 : currentIndex);
  }, [location.pathname]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    navigate(tabPaths[newValue]);
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
