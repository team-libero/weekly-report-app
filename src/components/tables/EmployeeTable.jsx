import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import EmployeeAddEditModal from '../modals/EmployeeAddEditModal';

class EmployeeTable extends Component {

  deleteItem = emp_id => {
    let confirmDelete = window.confirm('削除しますか？');
    if (confirmDelete) {
      fetch(`${process.env.REACT_APP_API_ROOT}/employee/delete`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emp_id
        })
      })
        .then(response => response.json())
        .then(item => {
          this.props.deleteItemFromState(emp_id)
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    let items;
    if (this.props.items.length > 0) {
      items = this.props.items.map(item => {
        return (
          <tr key={item.emp_id}>
            <th scope="row">{item.emp_id}</th>
            <td>{item.emp_lname + ' ' + item.emp_fname}</td>
            <td>{item.mail_address}</td>
            <td>
              <div style={{ margin: "auto" }}>
                <EmployeeAddEditModal mode="編集" item={item} updateState={this.props.updateState} />
                {' '}
                <Button color="danger" onClick={() => this.deleteItem(item.emp_id)}>削除</Button>
              </div>
            </td>
          </tr>
        );
      })
    } else {
      items = '';
    }

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>社員ID</th>
            <th>氏名</th>
            <th>メールアドレス</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default EmployeeTable;
