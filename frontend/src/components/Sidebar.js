import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Box,
  Typography,
  Collapse,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Description as PlanIcon,
  BugReport as TestIcon,
  People as UserIcon,
  Computer as SystemIcon,
  Assessment as ReportIcon,
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
  DocumentScanner,
  Settings,
  PlayArrow,
  ManageAccounts,
  List as ListIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';

const drawerWidth = 240;
const collapsedWidth = 72;

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [planoExpanded, setPlanoExpanded] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handlePlanoClick = () => {
    setPlanoExpanded(!planoExpanded);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    {
      text: 'Planos de Teste',
      icon: <PlanIcon />,
      path: '/plano',
      subItems: [
        { text: 'Criar Plano', icon: <ManageAccounts />, path: '/plano/criar' },
        { text: 'Lista de Planos', icon: <ListIcon />, path: '/plano/lista' },
        { text: 'Documentação', icon: <DocumentScanner />, path: '/plano/documentacao' },
        { text: 'Casos de Teste', icon: <DocumentScanner />, path: '/plano/casos' },
        { text: 'Execução', icon: <PlayArrow />, path: '/plano/execucao' },
        { text: 'Configuração', icon: <Settings />, path: '/plano/configuracao' },
      ]
    },
    { text: 'Usuários', icon: <UserIcon />, path: '/usuario' },
    { text: 'Sistemas', icon: <SystemIcon />, path: '/sistema' },
    { text: 'Relatórios', icon: <ReportIcon />, path: '/relatorio' },
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : collapsedWidth,
          transition: 'width 0.3s',
          boxSizing: 'border-box',
          overflowX: 'hidden',
        },
      }}
    >
      {/* Cabeçalho */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          backgroundColor: 'primary.main',
          color: 'white',
          padding: 2,
        }}
      >
        {open ? (
          <Typography variant="h6" noWrap sx={{ display: 'flex', alignItems: 'center' }}>
            SGT-S
          </Typography>
        ) : (
          <Typography variant="h6" noWrap>
            S
          </Typography>
        )}
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>

      {/* Usuário */}
      <Divider />
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, justifyContent: open ? 'flex-start' : 'center' }}>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>U</Avatar>
        {open && (
          <Box>
            <Typography variant="subtitle2">Usuário Logado</Typography>
            <Typography variant="body2" color="text.secondary">Admin</Typography>
          </Box>
        )}
      </Box>
      <Divider />

      {/* Menus */}
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            {item.subItems ? (
              <>
                <Tooltip title={item.text} placement="right" disableHoverListener={open}>
                  <ListItem
                    button
                    onClick={handlePlanoClick}
                    selected={location.pathname.startsWith(item.path)}
                    sx={{
                      backgroundColor: location.pathname.startsWith(item.path) ? 'action.selected' : 'inherit',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'action.hover'
                      }
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: location.pathname.startsWith(item.path) ? 'primary.main' : 'inherit'
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {open && (
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          fontWeight: 500,
                          fontSize: '0.95rem',
                          color: location.pathname.startsWith(item.path) ? 'primary.main' : 'text.primary'
                        }}
                      />
                    )}
                    {open && (planoExpanded ? <ExpandLess /> : <ExpandMore />)}
                  </ListItem>
                </Tooltip>
                <Collapse in={planoExpanded && open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <Tooltip key={subItem.text} title={subItem.text} placement="right" disableHoverListener={open}>
                        <ListItem
                          button
                          sx={{
                            pl: 4,
                            backgroundColor: location.pathname === subItem.path ? 'action.selected' : 'inherit',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease-in-out',
                            '&:hover': {
                              backgroundColor: 'action.hover'
                            }
                          }}
                          onClick={() => handleNavigation(subItem.path)}
                          selected={location.pathname === subItem.path}
                        >
                          <ListItemIcon
                            sx={{
                              color: location.pathname === subItem.path ? 'primary.main' : 'inherit',
                            }}
                          >
                            {subItem.icon}
                          </ListItemIcon>
                          {open && (
                            <ListItemText
                              primary={subItem.text}
                              primaryTypographyProps={{
                                fontWeight: 400,
                                fontSize: '0.9rem',
                                color: location.pathname === subItem.path ? 'primary.main' : 'text.secondary'
                              }}
                            />
                          )}
                        </ListItem>
                      </Tooltip>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <Tooltip title={item.text} placement="right" disableHoverListener={open}>
                <ListItem
                  button
                  onClick={() => handleNavigation(item.path)}
                  selected={location.pathname === item.path}
                  sx={{
                    backgroundColor: location.pathname === item.path ? 'action.selected' : 'inherit',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: location.pathname === item.path ? 'primary.main' : 'inherit'
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        color: location.pathname === item.path ? 'primary.main' : 'text.primary'
                      }}
                    />
                  )}
                </ListItem>
              </Tooltip>
            )}
          </React.Fragment>
        ))}
      </List>

      <Divider />
      <Tooltip title="Sair" placement="right" disableHoverListener={open}>
        <List>
          <ListItem button onClick={onLogout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            {open && <ListItemText primary="Sair" />}
          </ListItem>
        </List>
      </Tooltip>
    </Drawer>
  );
};

export default Sidebar;
