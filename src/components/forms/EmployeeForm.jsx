import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class EmployeeForm extends Component {
  state = {
    emp_id: '',
    department_id: '',
    team_id: '',
    role: '',
    emp_lname: '',
    emp_fname: '',
    emp_lname_kana: '',
    emp_fname_kana: '',
    gender: '',
    birthday: '',
    start_date: '',
    belong: '1',
    emp_status: '',
    change_date: '',
    mail_address: ''
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitFormAdd = e => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_ROOT}/employee/post`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        emp_id: this.props.maxEmpId + 1,
        department_id: this.state.department_id,
        team_id: this.state.team_id,
        role: this.state.role,
        emp_lname: this.state.emp_lname,
        emp_fname: this.state.emp_fname,
        emp_lname_kana: this.state.emp_lname_kana,
        emp_fname_kana: this.state.emp_fname_kana,
        gender: this.state.gender,
        birthday: this.state.birthday
          ? new Date(this.state.birthday).toLocaleDateString("ja-JP", {year: "numeric", month: "2-digit", day: "2-digit"}).replaceAll('/', '-')
          : null,
        start_date: this.state.start_date
          ? new Date(this.state.start_date).toLocaleDateString("ja-JP", {year: "numeric", month: "2-digit", day: "2-digit"}).replaceAll('/', '-')
          : null,
        belong: this.state.belong,
        emp_status: this.state.emp_status,
        change_date: new Date().toLocaleDateString("ja-JP", {year: "numeric", month: "2-digit", day: "2-digit"}).replaceAll('/', '-'),
        mail_address: this.state.mail_address
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          this.props.addItemToState(item[0]);
          this.props.toggle();
        } else {
          console.log('failure');
        }
      })
      .catch(err => console.log(err));
  }

  submitFormEdit = e => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_ROOT}/employee/put`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        emp_id: this.state.emp_id,
        department_id: this.state.department_id,
        team_id: this.state.team_id,
        emp_no: null,
        role: this.state.role,
        emp_lname: this.state.emp_lname,
        emp_fname: this.state.emp_fname,
        emp_lname_kana: this.state.emp_lname_kana,
        emp_fname_kana: this.state.emp_fname_kana,
        gender: this.state.gender,
        birthday: this.state.birthday
          ? new Date(this.state.birthday).toLocaleDateString("ja-JP", {year: "numeric", month: "2-digit", day: "2-digit"}).replaceAll('/', '-')
          : null,
        start_date: this.state.start_date
          ? new Date(this.state.start_date).toLocaleDateString("ja-JP", {year: "numeric", month: "2-digit", day: "2-digit"}).replaceAll('/', '-')
          : null,
        belong: this.state.belong,
        emp_status: this.state.emp_status,
        change_date: new Date().toLocaleDateString("ja-JP", {year: "numeric", month: "2-digit", day: "2-digit"}).replaceAll('/', '-'),
        mail_address: this.state.mail_address
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          this.props.updateState(item[0]);
          this.props.toggle();
        } else {
          console.log('failure');
        }
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    if (this.props.item) {
      const { emp_id, department_id, team_id, role, emp_lname, emp_fname, emp_lname_kana, emp_fname_kana, gender, birthday, start_date, belong, emp_status, change_date, mail_address } = this.props.item;
      this.setState({ emp_id, department_id, team_id, role, emp_lname, emp_fname, emp_lname_kana, emp_fname_kana, gender, birthday, start_date, belong, emp_status, change_date, mail_address });
    };
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="department_id">部署</Label>
          <Input type="select" name="department_id" id="department_id" onChange={this.onChange} value={this.state.department_id === null ? '' : this.state.department_id}>
            <option value=""></option>
            <option value="1">総務</option>
            <option value="2">システム開発部</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="team_id">チーム</Label>
          <Input type="select" name="team_id" id="team_id" onChange={this.onChange} value={this.state.team_id === null ? '' : this.state.team_id}>
            <option value=""></option>
            <option value="10001">Avengers!</option>
            <option value="10002">Advance</option>
            <option value="10003">セクション1</option>
            <option value="10004">Foresight</option>
            <option value="10005">Impetus</option>
            <option value="10006">Libero</option>
            <option value="10007">Step</option>
            <option value="10008">セクション6</option>
            <option value="10009">ファミリア</option>
            <option value="10010">セクション2</option>
            <option value="10011">セクション3</option>
            <option value="20001">Aspire</option>
            <option value="20002">Discovery</option>
            <option value="20003">セクション4</option>
            <option value="20004">Axcelsior</option>
            <option value="20005">オモイカネ</option>
            <option value="20006">Idea</option>
            <option value="20007">さくら</option>
            <option value="20008">Flexible</option>
            <option value="20009">えにし</option>
            <option value="20010">セクション5</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="role">役職</Label>
          <Input type="select" name="role" id="role" onChange={this.onChange} value={this.state.role === null ? '' : this.state.role}>
            <option value=""></option>
            <option value="1">一般社員</option>
            <option value="2">チーフ</option>
            <option value="3">リーダー</option>
            <option value="4">アシスタントマネージャー</option>
            <option value="5">マネージャー</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="emp_lname">社員姓</Label>
          <Input type="text" name="emp_lname" id="emp_lname" onChange={this.onChange} value={this.state.emp_lname === null ? '' : this.state.emp_lname} />
        </FormGroup>
        <FormGroup>
          <Label for="emp_fname">社員名</Label>
          <Input type="text" name="emp_fname" id="emp_fname" onChange={this.onChange} value={this.state.emp_fname === null ? '' : this.state.emp_fname} />
        </FormGroup>
        <FormGroup>
          <Label for="emp_lname_kana">社員姓カナ</Label>
          <Input type="text" name="emp_lname_kana" id="emp_lname_kana" onChange={this.onChange} value={this.state.emp_lname_kana === null ? '' : this.state.emp_lname_kana} />
        </FormGroup>
        <FormGroup>
          <Label for="emp_fname_kana">社員名カナ</Label>
          <Input type="text" name="emp_fname_kana" id="emp_fname_kana" onChange={this.onChange} value={this.state.emp_fname_kana === null ? '' : this.state.emp_fname_kana} />
        </FormGroup>
        <FormGroup>
          <Label for="gender">性別</Label>
          <FormGroup check>
            <Input type="radio" id="gender1" name="gender" value="1" onChange={this.onChange} checked={(!this.state.gender || this.state.gender === '1') ? true : ''} />
            <Label check for="gender1">男</Label>
          </FormGroup>
          <FormGroup check>
            <Input type="radio" id="gender2" name="gender" value="2" onChange={this.onChange} checked={this.state.gender === '2' ? true : ''} />
            <Label check for="gender2">女</Label>
          </FormGroup>
        </FormGroup>
        <FormGroup>
          <Label for="birthday">生年月日</Label>
          <Input type="date" name="birthday" id="birthday" onChange={this.onChange} value={this.state.birthday === null ? '' : new Date(this.state.birthday).toLocaleDateString("ja-JP", {year: "numeric", month: "2-digit", day: "2-digit"}).replaceAll('/', '-')} />
        </FormGroup>
        <FormGroup>
          <Label for="start_date">入社日</Label>
          <Input type="date" name="start_date" id="start_date" onChange={this.onChange} value={this.state.start_date === null ? '' : new Date(this.state.start_date).toLocaleDateString("ja-JP", {year: "numeric", month: "2-digit", day: "2-digit"}).replaceAll('/', '-')} />
        </FormGroup>
        <FormGroup>
          <Label for="emp_status">状態</Label>
          <Input type="select" name="emp_status" id="emp_status" onChange={this.onChange} value={this.state.emp_status === null ? '' : this.state.emp_status}>
            <option value=""></option>
            <option value="1">正社員</option>
            <option value="2">試用期間</option>
            <option value="9">退職済</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="mail_address">メールアドレス</Label>
          <Input type="email" name="mail_address" id="mail_address" onChange={this.onChange} value={this.state.mail_address === null ? '' : this.state.mail_address} />
        </FormGroup>
        <Button>確定</Button>
      </Form>
    );
  }
}

export default EmployeeForm;
