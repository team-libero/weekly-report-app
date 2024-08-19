import React from 'react';
import { Container } from 'reactstrap';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import EmployeeListPage from './components/pages/EmployeeListPage';
import NotfoundPage from './components/pages/NotfoundPage';
import MenuPage from './components/pages/MenuPage';
import ReportDetailPage from './components/pages/ReportDetailPage';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        bg: 'gray.100',
        color: 'black',
        minHeight: '100vh',
      },
    },
  },
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Container className="App">
        <Routes>
          <Route path="/" exact element={<LoginPage />} />
          <Route path="/Menu" exact element={<MenuPage />} />
          <Route path="/EmployeeList" exact element={<EmployeeListPage />} />
          <Route path="/ReportDetail" exact element={<ReportDetailPage />} />
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
      </Container>
    </ChakraProvider>
  );
};

export default App;
