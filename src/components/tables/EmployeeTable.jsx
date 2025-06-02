import { Table, Button } from 'reactstrap';

const EmployeeTable = () => {
  let items;
  if (this.props.items.length > 0) {
    items = this.props.items.map((item) => {
      return (
        <tr key={item.employeeId}>
          <th scope="row">{item.employeeId}</th>
          <td>{item.name}</td>
          <td>{item.mail}</td>
          <td>
            <div style={{ margin: 'auto' }}>

            </div>
          </td>
        </tr>
      );
      });
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
      <tbody>{items}</tbody>
    </Table>
  );
}

export default EmployeeTable;
