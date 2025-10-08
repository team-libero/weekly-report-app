import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

const EmployeeTable = ({ items }) => {

  let employeeList = '';
  if (items.length > 0) {
    employeeList = items.map((item) => {
      return (
        <tr key={item.employeeId}>
          <th scope="row">{item.employeeId}</th>
          <td>{item.name}</td>
          <td>{item.mail}</td>
          <td>
            <div style={{ margin: 'auto' }}>
              <Box
                className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 px-3 py-1"
                color="white"
                as={Link}
                to={`/reports?employeeId=${item.employeeId}`}
                style={{borderRadius: '5px'}}
              >
                選択
              </Box>
            </div>
          </td>
        </tr>
      );
    });
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
      <tbody>{employeeList}</tbody>
    </Table>
  );
}

export default EmployeeTable;
