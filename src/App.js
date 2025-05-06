import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import { Login, Dashboard, Teste, Usuario, Sistema, Relatorio, } from "./pages";
import Plano from './plano/Plano.js';
import Sidebar from "./components/Sidebar.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {isAuthenticated && <Sidebar onLogout={handleLogout} />}
        <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
          <Routes>
            <Route path="/login" element={
              !isAuthenticated ? 
                <Login onLogin={handleLogin} /> : 
                <Navigate to="/dashboard" replace />
            } />
            <Route path="/dashboard" element={
              isAuthenticated ? 
                <Dashboard /> : 
                <Navigate to="/login" replace />
            } />
            <Route path="/plano/*" element={
              isAuthenticated ? 
                <Plano /> : 
                <Navigate to="/login" replace />
            } />
            <Route path="/teste" element={
              isAuthenticated ? 
                <Teste /> : 
                <Navigate to="/login" replace />
            } />
            <Route path="/usuario" element={
              isAuthenticated ? 
                <Usuario /> : 
                <Navigate to="/login" replace />
            } />
            <Route path="/sistema" element={
              isAuthenticated ? 
                <Sistema /> : 
                <Navigate to="/login" replace />
            } />
            <Route path="/relatorio" element={
              isAuthenticated ? 
                <Relatorio /> : 
                <Navigate to="/login" replace />
            } />
            <Route path="/" element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
            } />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;