import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const LoginForm = () => {
  const [user_id, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { employeeId, employeeName, setEmployeeId, setEmployeeName } =
    useContext(UserContext);

  const navigate = useNavigate();
  const login = () => {
    navigate('/reportedit');
  };

  // ログイン実装前動確用 いつか消す
  useEffect(() => {
    setEmployeeId('2');
    setEmployeeName('花岡 壮之介');
  });

  return (
    <Form onSubmit={login} style={{ maxWidth: '400px', margin: 'auto' }}>
      <FormGroup>
        <Label for="user_id" style={{ textAlign: 'left' }}>
          ユーザID
        </Label>
        <Input
          type="text"
          name="user_id"
          id="user_id"
          value={user_id}
          onChange={(e) => setUserId(e.target.value)}
          style={{ width: '100%' }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password" style={{ textAlign: 'left' }}>
          パスワード
        </Label>
        <Input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%' }}
        />
      </FormGroup>
      <Button color="primary" block style={{ marginTop: '2rem' }}>
        ログイン
      </Button>
    </Form>
  );
};

export default LoginForm;
