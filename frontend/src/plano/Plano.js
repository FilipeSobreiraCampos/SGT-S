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
import PlanoList from './PlanoList';
import CriarPlano from './CriarPlano';
import CasosTeste from './CasosTeste'

const Plano = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabValue, setTabValue] = React.useState(0);

  const tabPaths = ['/plano/criar','/plano/lista', '/plano/documentacao','plano/casos', '/plano/execucao'];

  // Atualiza a aba com base na URL
  React.useEffect(() => {
    const currentIndex = tabPaths.findIndex(path => location.pathname.startsWith(path));
    setTabValue(currentIndex === -1 ? 0 : currentIndex);
  }, [location.pathname]);

  return (
    <Box>
        <Routes>
        <Route path="/lista" element={<PlanoList />} />
        <Route path="/documentacao" element={<DocumentacaoPlano />} />
        <Route path="/casos" element={<CasosTeste />} />
        <Route path="/execucao" element={<ExecucaoPlano />} />
        <Route path="/criar" element={<CriarPlano />} />
      </Routes>
    </Box>
  );
};

export default Plano;
