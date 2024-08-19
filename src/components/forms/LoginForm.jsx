import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [user_id, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const login = () => {
    navigate('/Menu');
  }

  return (
    <Form onSubmit={login}>
      <FormGroup>
        <Label for="user_id">ユーザID</Label>
        <Input
          type="text" name="user_id" id="user_id" value={user_id} 
          onChange={(e) => setUserId(e.target.value)} style={{ width: "200px" }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">パスワード</Label>
        <Input
          type="password" name="password" id="password" value={password}
          onChange={(e) => setPassword(e.target.value)} style={{ width: "200px" }}
        />
      </FormGroup>
      <Button color="primary">ログイン</Button>
    </Form>
  )
}

export default LoginForm;
