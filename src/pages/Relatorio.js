import React, { useRef, useState } from 'react';
import {
  Box, Typography, Select, MenuItem, Button,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from '@mui/material';
import {
  LineChart, Line, PieChart, Pie, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  ResponsiveContainer, Cell
} from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';

const dataLine = [
  { name: 'Jan', testes: 10 },
  { name: 'Fev', testes: 20 },
  { name: 'Mar', testes: 30 },
];

const dataPie = [
  { name: 'Baixa', value: 30 },
  { name: 'Média', value: 50 },
  { name: 'Alta', value: 20 },
];

const COLORS = ['#4caf50', '#ff9800', '#f44336']; // Verde, laranja, vermelho

const dataBar = [
  { name: 'Funcionalidade A', aprovados: 50, reprovados: 10 },
  { name: 'Funcionalidade B', aprovados: 40, reprovados: 15 },
];

const Relatorio = () => {
  const [filtro, setFiltro] = useState('mensal');

  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  const exportarPDF = async () => {
    const doc = new jsPDF();

    doc.text('Relatório de Execuções de Testes', 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [['Data', 'Sistema', 'Testes Executados', 'Aprovação (%)']],
      body: [
        ['10/02/2025', 'SGT-S', '50', '90%'],
        ['11/02/2025', 'SGT-S', '45', '85%']
      ],
    });

    let y = doc.lastAutoTable.finalY + 10;

    const addChartToPDF = async (ref, title) => {
      if (ref.current) {
        const canvas = await html2canvas(ref.current);
        const imgData = canvas.toDataURL('image/png');
        doc.text(title, 14, y + 10);
        doc.addImage(imgData, 'PNG', 14, y + 15, 180, 80);
        y += 100;
      }
    };

    await addChartToPDF(lineChartRef, 'Progresso dos Testes');
    await addChartToPDF(pieChartRef, 'Distribuição de Bugs');
    await addChartToPDF(barChartRef, 'Resultados por Funcionalidade');

    doc.save('relatorio_testes.pdf');
  };

  const exportarCSV = () => {
    const rows = [
      ['Data', 'Sistema', 'Testes Executados', 'Aprovação (%)'],
      ['10/02/2025', 'SGT-S', '50', '90%'],
      ['11/02/2025', 'SGT-S', '45', '85%'],
    ];

    const csvContent = rows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'relatorio_testes.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Relatórios de Testes</Typography>

      <Box display="flex" alignItems="center" mb={2}>
        <Select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <MenuItem value="diário">Diário</MenuItem>
          <MenuItem value="mensal">Mensal</MenuItem>
          <MenuItem value="anual">Anual</MenuItem>
        </Select>

        <Button
          variant="contained"
          color="primary"
          onClick={exportarPDF}
          style={{ marginLeft: 10 }}
        >
          Exportar PDF
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={exportarCSV}
          style={{ marginLeft: 10 }}
        >
          Exportar CSV
        </Button>
      </Box>

      <Box mt={4} ref={lineChartRef}>
        <Typography variant="h6">Progresso dos Testes</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dataLine}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="testes" stroke="#1976d2" strokeWidth={3} dot={{ fill: '#1976d2' }} />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <Box mt={4} display="flex" justifyContent="space-between" flexWrap="wrap">
        <Box width="48%" ref={pieChartRef}>
          <Typography variant="h6">Distribuição de Bugs</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataPie}
                dataKey="value"
                nameKey="name"
                label
                outerRadius={100}
                labelLine={false}
                cx="50%"
                cy="50%"
              >
                {dataPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        <Box width="48%" ref={barChartRef}>
          <Typography variant="h6">Resultados por Funcionalidade</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataBar}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="aprovados" fill="#4CAF50" />
              <Bar dataKey="reprovados" fill="#EF5350" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      <Box mt={4}>
        <Typography variant="h6">Execuções de Testes</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Sistema</TableCell>
                <TableCell>Testes Executados</TableCell>
                <TableCell>Aprovação (%)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>10/02/2025</TableCell>
                <TableCell>SGT-S</TableCell>
                <TableCell>50</TableCell>
                <TableCell>90%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>11/02/2025</TableCell>
                <TableCell>SGT-S</TableCell>
                <TableCell>45</TableCell>
                <TableCell>85%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Relatorio;
