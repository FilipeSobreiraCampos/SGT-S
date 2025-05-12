import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider,
  LinearProgress,
  Tooltip
} from '@mui/material';
import {
  AssignmentTurnedIn,
  AssignmentLate,
  BugReport,
  CheckCircle
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const stats = [
    {
      title: 'Planos Ativos',
      value: 15,
      icon: <AssignmentTurnedIn fontSize="large" />,
      color: '#1976d2',
      gradient: 'linear-gradient(135deg, #1976d2 0%, #63a4ff 100%)'
    },
    {
      title: 'Testes Pendentes',
      value: 27,
      icon: <AssignmentLate fontSize="large" />,
      color: '#ed6c02',
      gradient: 'linear-gradient(135deg, #ed6c02 0%, #ff9800 100%)'
    },
    {
      title: 'Bugs Reportados',
      value: 42,
      icon: <BugReport fontSize="large" />,
      color: '#d32f2f',
      gradient: 'linear-gradient(135deg, #d32f2f 0%, #ef5350 100%)'
    },
    {
      title: 'Testes Concluídos',
      value: 78,
      icon: <CheckCircle fontSize="large" />,
      color: '#2e7d32',
      gradient: 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)'
    }
  ];

  const recentTests = [
    { id: 'TST-001', name: 'Login Validation', status: 'Concluído', date: '18/02/2025' },
    { id: 'TST-002', name: 'User Registration', status: 'Pendente', date: '19/02/2025' },
    { id: 'TST-003', name: 'Payment Processing', status: 'Em Progresso', date: '20/02/2025' },
    { id: 'TST-004', name: 'Order Checkout', status: 'Concluído', date: '21/02/2025' }
  ];

  const progressData = [
    { system: 'Sistema ERP', progress: 75 },
    { system: 'Sistema CRM', progress: 45 },
    { system: 'Portal do Cliente', progress: 90 },
    { system: 'App Mobile', progress: 30 }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 160,
                  color: '#fff',
                  background: stat.gradient,
                  borderRadius: 3,
                  boxShadow: `0px 4px 20px ${stat.color}44`
                }}
              >
                <Box sx={{ mb: 2 }}>{stat.icon}</Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {stat.value}
                </Typography>
                <Typography variant="subtitle1">{stat.title}</Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card elevation={3}>
              <CardHeader title="Testes Recentes" />
              <Divider />
              <CardContent sx={{ p: 0 }}>
                <List>
                  {recentTests.map((test, index) => (
                    <React.Fragment key={test.id}>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" fontWeight="bold">
                              {test.id}: {test.name}
                            </Typography>
                          }
                          secondary={`Status: ${test.status} | Data: ${test.date}`}
                        />
                      </ListItem>
                      {index < recentTests.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card elevation={3}>
              <CardHeader title="Progresso de Testes por Sistema" />
              <Divider />
              <CardContent>
                {progressData.map((item, index) => {
                  const colors = ['#1976d2', '#ed6c02', '#2e7d32', '#d32f2f'];
                  const color = colors[index % colors.length];

                  return (
                    <Box key={item.system} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1" fontWeight="bold">{item.system}</Typography>
                        <Typography variant="body1" fontWeight="bold">{item.progress}%</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={item.progress}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: '#f0f0f0',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: color,
                            transition: 'width 1s ease-in-out'
                          }
                        }}
                      />
                    </Box>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
