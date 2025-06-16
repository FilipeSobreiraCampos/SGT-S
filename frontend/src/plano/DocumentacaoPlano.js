import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  MenuItem,
  FormControlLabel,
  Switch,
  Checkbox,
  Divider,
  Alert
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const DocumentacaoPlano = () => {
  const [searchParams] = useSearchParams();
  const isNew = searchParams.get('new') === 'true';
  const planoId = searchParams.get('id');
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    sistema: '',
    versao: '',
    descricao: '',
    objetivo: '',
    escopo: '',
    metodologia: 'Caixa Preta',
    criteriosAceitacao: '',
    responsavel: '',
    recursos: '',
    cronograma: '',
    riscos: '',
    aprovacao: false
  });

  const [configuracao, setConfiguracao] = useState({
    nome: '',
    descricao: '',
    parametros: '',
    criterios: '',
    dadosEntrada: '',
    status: false,
  });

  useEffect(() => {
    if (planoId) {
      setFormData({
        id: 'PL001',
        nome: 'Plano de Teste - Portal Web',
        sistema: 'Portal de Clientes',
        versao: '1.2',
        descricao: 'Plano de teste para validação do Portal Web de clientes',
        objetivo: 'Validar todas as funcionalidades do portal web antes do lançamento da versão 2.0',
        escopo: 'Testes de interface, usabilidade, funcionalidade e integração',
        metodologia: 'Caixa Preta',
        criteriosAceitacao: '100% dos testes críticos aprovados, máximo de 5 bugs de baixa severidade',
        responsavel: 'Maria Silva',
        recursos: '2 testadores seniores, 1 desenvolvedor de suporte',
        cronograma: '01/03/2025 a 15/03/2025',
        riscos: 'Atraso na entrega de ambiente de homologação',
        aprovacao: true
      });
    } else if (isNew) {
      setFormData(f => ({
        ...f,
        id: `PL${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
      }));
    }
  }, [planoId, isNew]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (name in configuracao) {
      setConfiguracao(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'aprovacao' ? checked : value
      }));
    }
    setSaved(false);
  };

  const handleSave = () => {
    console.log('Formulário principal:', formData);
    console.log('Configuração do teste:', configuracao);
    setTimeout(() => {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 500);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        {`Documentação do plano ${formData.nome}`}
      </Typography>

      {/* Informações Básicas */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Informações Básicas</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Nome do Plano" fullWidth name="nome" value={formData.nome} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Sistema" fullWidth name="sistema" value={formData.sistema} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Versão" fullWidth name="versao" value={formData.versao} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Descrição" fullWidth name="descricao" value={formData.descricao} onChange={handleChange} required multiline rows={4} />
          </Grid>
        </Grid>
      </Paper>

      {/* Detalhes do Plano */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Detalhes do Plano</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Objetivo" fullWidth name="objetivo" value={formData.objetivo} onChange={handleChange} required multiline rows={3} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Escopo" fullWidth name="escopo" value={formData.escopo} onChange={handleChange} required multiline rows={3} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Metodologia" select fullWidth name="metodologia" value={formData.metodologia} onChange={handleChange}>
              <MenuItem value="Caixa Preta">Caixa Preta</MenuItem>
              <MenuItem value="Caixa Branca">Caixa Branca</MenuItem>
              <MenuItem value="Cinza">Cinza</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Critérios de Aceitação" fullWidth name="criteriosAceitacao" value={formData.criteriosAceitacao} onChange={handleChange} required multiline rows={3} />
          </Grid>
        </Grid>
      </Paper>

      {/* Recursos e Cronograma */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Recursos e Cronograma</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Responsável" fullWidth name="responsavel" value={formData.responsavel} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Recursos" fullWidth name="recursos" value={formData.recursos} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Cronograma" fullWidth name="cronograma" value={formData.cronograma} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Riscos" fullWidth name="riscos" value={formData.riscos} onChange={handleChange} multiline rows={2} />
          </Grid>
        </Grid>
      </Paper>

      {/* Configuração do Teste */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.4 }}
      >
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Configuração do Teste
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Configure os parâmetros de execução, critérios de aceitação e dados de entrada dos testes utilizando os exemplos abaixo.
          </Typography>
          <Divider sx={{ my: 2 }} />
          <TextField label="Nome do Teste" name="nome" value={configuracao.nome} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Descrição" name="descricao" value={configuracao.descricao} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Parâmetros" name="parametros" value={configuracao.parametros} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Critérios de Aceitação" name="criterios" value={configuracao.criterios} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Dados de Entrada" name="dadosEntrada" value={configuracao.dadosEntrada} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <FormControlLabel control={<Checkbox checked={configuracao.status} onChange={handleChange} name="status" />} label="Ativar Teste" />
        </Paper>
      </motion.div>

      {/* Aprovação */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Aprovação</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={formData.aprovacao}
              onChange={handleChange}
              name="aprovacao"
            />
          }
          label="Plano Aprovado"
        />
      </Paper>

      {/* Botões */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        {saved && (
          <Alert severity="success" sx={{ flex: 1, mr: 2 }}>Plano salvo com sucesso!</Alert>
        )}
        <Button variant="contained" color="primary" onClick={handleSave} startIcon={<SaveIcon />}>
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default DocumentacaoPlano;
