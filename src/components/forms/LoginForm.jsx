import React, { Component, useState, useContext } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const LoginForm = () => {
  const [user_id, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [input_error, setInputErrorState] = useState(false);
  //const [emp_id, setEmpId] = useState('');
  const {
    setEmployeeId,
    setRole,
    setDepartmentId,
    setDepartmentName,
    setTeamName,
    setEmpLname,
    setEmpFname,
  } = useContext(UserContext);
  const navigate = useNavigate();

  // const login = () => {
  //   navigate('/reportedit');
  // };

  const login = (e) => {
    // 画面遷移の抑制
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_ROOT}/login/getLoginData`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user_id, password: password }),
    })
      .then((response) => response.json())
      .then((items) => {
        console.log(items);
        if (items.length > 0 && !items.dataExists) {
          console.log(items[0]);
          // 取得した社員ID、役職をセッションに保持
          setEmployeeId(items[0].emp_id);
          setRole(items[0].role);
          setDepartmentId(items[0].department_id);
          setDepartmentName(items[0].department_name);
          setTeamName(items[0].team_name);
          setEmpLname(items[0].emp_lname);
          setEmpFname(items[0].emp_fname);

          console.log(items[0].department_id);
          if (items[0].department_id === '1') {
            // 部署が総務（営業、社長）の場合、社員選択画面へ遷移
            navigate('/employeelist');
          } else {
            //上記以外の場合、週報一覧画面へ遷移
            navigate('/reports');
          }
          // navigate('/reportedit');
        } else {
          // 画面遷移の抑制
          //e.preventDefault();
          console.log('dataExists');
          setInputErrorState(true);
        }
      })
      .catch((err) => console.log(err));
  };

  let error_text;
  if (input_error) {
    error_text = (
      <p style={{ color: 'red' }}>
        <u>ユーザIDまたはパスワードに誤りがあります。</u>
      </p>
    );
  } else {
  }

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
          error={input_error}
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
      {error_text}
    </Form>
  );
};

export default LoginForm;
