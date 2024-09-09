import React from 'react';
import { Container } from 'reactstrap';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import EmployeeListPage from './components/pages/EmployeeListPage';
import NotfoundPage from './components/pages/NotfoundPage';
import ReportDetailPage from './components/pages/ReportDetailPage';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ReportEditPage } from './components/pages/ReportEditPage';
import { ReportsPage } from './components/pages/ReportsPage';
import Header from './components/Header';

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

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" exact element={<LoginPage />} />
        <Route
          path="/employeelist"
          exact
          element={
            <Layout>
              <EmployeeListPage />
            </Layout>
          }
        />
        <Route
          path="/reportdetail"
          exact
          element={
            <Layout>
              <ReportDetailPage />
            </Layout>
          }
        />
        <Route
          path="/reports"
          exact
          element={
            <Layout>
              <ReportsPage />
            </Layout>
          }
        />
        <Route
          path="/reportedit"
          exact
          element={
            <Layout>
              <ReportEditPage />
            </Layout>
          }
        />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </ChakraProvider>
  );
};

export default App;
