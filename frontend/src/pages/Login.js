import React, { useState } from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  Link
} from '@mui/material';
import { PersonOutline, LockOutlined, EmailOutlined } from '@mui/icons-material';

const Login = ({ onLogin }) => {
  const [step, setStep] = useState('login'); // 'login' | 'reset' | 'confirmation'
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'password') {
        onLogin();
      } else {
        setError('Usuário ou senha inválidos.');
        setCredentials({ username: '', password: '' });
      }
      setLoading(false);
    }, 1000);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('confirmation');
    }, 1000);
  };

  const renderLoginForm = () => (
    <>
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: '#fff',
          width: 60,
          height: 60,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 2,
        }}
      >
        <PersonOutline fontSize="medium" />
      </Box>

      <Typography variant="h6" fontWeight="bold" textAlign="center">
        SGT-S: Login
      </Typography>

      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 2 }}>
        Sistema de Gerenciamento de Testes de Software
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmitLogin} noValidate>
        <TextField
          fullWidth
          margin="normal"
          id="username"
          name="username"
          label="Usuário"
          autoComplete="username"
          autoFocus
          required
          value={credentials.username}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutline />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          id="password"
          name="password"
          label="Senha"
          type="password"
          autoComplete="current-password"
          required
          value={credentials.password}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined />
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, py: 1.5 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
        </Button>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Dica: admin / password
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Link component="button" variant="body2" onClick={() => setStep('reset')}>
              Esqueceu a senha?
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );

  const renderResetForm = () => (
    <>
      <Typography variant="h6" fontWeight="bold" textAlign="center" sx={{ mb: 2 }}>
        Recuperação de Senha
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 2 }}>
        Digite seu e-mail e enviaremos um link para redefinir sua senha.
      </Typography>

      <Box component="form" onSubmit={handleResetPassword} noValidate>
        <TextField
          fullWidth
          margin="normal"
          label="E-mail"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlined />
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, py: 1.5 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Enviar Link'}
        </Button>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Link component="button" variant="body2" onClick={() => setStep('login')}>
            Voltar para o login
          </Link>
        </Box>
      </Box>
    </>
  );

  const renderConfirmation = () => (
    <>
      <Typography variant="h6" fontWeight="bold" textAlign="center" sx={{ mb: 2 }}>
        Verifique seu e-mail
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        Um link foi enviado para <strong>{email}</strong>. Siga as instruções para redefinir sua senha.
      </Typography>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Link component="button" variant="body2" onClick={() => setStep('login')}>
          Voltar ao login
        </Link>
      </Box>
    </>
  );

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={4} sx={{ p: 4, width: '100%', borderRadius: 4 }}>
          {step === 'login' && renderLoginForm()}
          {step === 'reset' && renderResetForm()}
          {step === 'confirmation' && renderConfirmation()}
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
