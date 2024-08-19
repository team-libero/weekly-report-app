import React from 'react';
import { Container } from 'reactstrap';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import EmployeeListPage from './components/pages/EmployeeListPage';
import NotfoundPage from './components/pages/NotfoundPage';
import MenuPage from './components/pages/MenuPage';

const App = () => {

  return (
    <Container className="App">
      <Routes>
        <Route path="/" exact element={ <LoginPage /> } />
        <Route path="/Menu" exact element={ <MenuPage /> } />
        <Route path="/EmployeeList" exact element={ <EmployeeListPage /> } />
        <Route path="*" element={ <NotfoundPage /> } />
      </Routes>
    </Container>
  );
}

export default App;
