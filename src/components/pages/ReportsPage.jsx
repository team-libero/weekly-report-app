import { Box, Flex } from '@chakra-ui/react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import { UserContext } from '../contexts/UserContext';

export const ReportsPage = () => {
  const navigate = useNavigate();
  const [reportsInfo, setReportsInfo] = useState({});
  const [reports, setReports] = useState([]);

  const { employeeId } = useContext(UserContext);
  console.log('Employee ID:', employeeId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response, response2] = await Promise.all([
          fetch(
            `${process.env.REACT_APP_API_ROOT}/reportsInfo?employeeId=${employeeId}`
          ),
          fetch(
            `${process.env.REACT_APP_API_ROOT}/reports?employeeId=${employeeId}`
          ),
        ]);

        const [data1, data2] = await Promise.all([
          response.json(),
          response2.json(),
        ]);

        const result1 = data1.result[0];
        setReportsInfo(result1);
        setReports(data2);
      } catch (error) {
        console.error('Faled to fetch report data', error);
      }
    };
    fetchData();
  }, []);

  const onClickConfirm = (id) => {
    navigate(`/reportdetail?reportId=${id}`);
  };

  return (
    <Container>
      <TableContainer>
        <Flex justifyContent="center" width="100%" px={4}>
          <Box
            width="100%"
            maxW="720px"
            bg="white"
            borderRadius="md"
            boxShadow="sm"
          >
            <TableStyle>
              <thead>
                <tr>
                  <td>記入社名</td>
                  <td className="border-left">{reportsInfo.name}</td>
                </tr>
              </thead>
              <thead>
                <tr>
                  <td>所属チームLD名</td>
                  <td className="border-left">{reportsInfo.teamldname}</td>
                </tr>
              </thead>
              <thead>
                <tr>
                  <td>ユーザ会社名</td>
                  <td className="border-left">{reportsInfo.userCompany}</td>
                </tr>
              </thead>
              <thead>
                <tr>
                  <td>元請会社名</td>
                  <td className="border-left">{reportsInfo.primeContractor}</td>
                </tr>
              </thead>
              <thead>
                <tr>
                  <td>現場住所</td>
                  <td className="border-left">{reportsInfo.address}</td>
                </tr>
              </thead>
              <thead>
                <tr>
                  <td>定時</td>
                  <td className="border-left">{reportsInfo.regularTime}</td>
                </tr>
              </thead>
              <thead>
                <tr>
                  <td>自社担当営業</td>
                  <td className="border-left">{reportsInfo.salesemployee}</td>
                </tr>
              </thead>
            </TableStyle>
          </Box>
        </Flex>
      </TableContainer>
      <Flex justifyContent="center" width="100%" px={4}>
        <Box
          width="100%"
          mt={'16px'}
          maxW="720px"
          bg="white"
          borderRadius="md"
          boxShadow="sm"
        >
          <TableStyle>
            <tbody>
              {reports.reportList?.map((report) => (
                <tr key={report.reportId}>
                  <td style={{ verticalAlign: 'middle' }}>
                    {report.reportperiod}
                  </td>
                  <td>
                    <Button
                      onClick={() => onClickConfirm(report.reportId)}
                      style={styledButtonStyles}
                    >
                      確認
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableStyle>
        </Box>
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
`;

const TableStyle = styled.table`
  width: 100%;
  border-collapse: collapse;

  tr {
    border-bottom: 1px solid #e2e8f0;
    height: 60px;
  }

  td {
    padding: 12px 16px;
    font-size: 16px;
  }

  td:last-child {
    text-align: right;
  }
`;

const TableContainer = styled.div`
  margin: 0 auto;
`;

const styledButtonStyles = {
  backgroundColor: '#2b6cb0',
  color: 'white',
  padding: '8px 16px',
  marginRight: '4px',
  _hover: {
    backgroundColor: '#2c5282',
  },
};
