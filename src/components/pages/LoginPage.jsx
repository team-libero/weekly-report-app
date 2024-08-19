import React from 'react';
import { Container } from 'reactstrap';
import LoginForm from '../forms/LoginForm';

const LoginPage = () => {
  return (
    <>
    <h2 style={{ 
        textAlign: "center", 
      }}>週報システムログイン</h2>
    <Container 
      className="Login" 
      style={{ 
        textAlign: "center", 
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <LoginForm />
    </Container>
    </>
  )
}

export default LoginPage;
