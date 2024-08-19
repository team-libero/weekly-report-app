import React from 'react';
import { Button, Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const NotfoundPage = () => {
  const navigate = useNavigate();
  const onClickReturn = () => {
    navigate('/');
  }

  return (
    <Container className="Notfound" style={{ testAlign: "center" }}>
      <h1>Notfound!</h1>
      <Button onClick={onClickReturn} style={{ marginTop: "20px" }}>戻る</Button>
    </Container>
  )
}

export default NotfoundPage;
