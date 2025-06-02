import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Accordion,
 // AccordionBody,
 // AccordionHeader,
 // AccordionItem,
  Button,
  Table,
} from 'reactstrap';
import styled from 'styled-components';

export const ReportsPage = () => {
  const navigate = useNavigate();

  const employee_Id = '55'; // navigate.user_id;
  console.log('Employee ID:', employee_Id);

  // getRecords() {
    const items = fetch(`${process.env.REACT_APP_API_ROOT}/reports?employeeId=${employee_Id}&pageNo=1&dataAmount=10`);
      // .then(response => response.json())
      // .then(items => this.setState({ items: items }))
      // .catch(err => console.log(err));
  // };
  // const data = getRecords();
  // fetch(`${process.env.REACT_APP_API_ROOT}/reports?employeeId=${employee_Id}&pageNo=1&dataAmount=10`, {
  //   method: 'get',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     emp_id
  //   })
  // })
  //   .then(response => response.json())
  //   .then(item => {
  //     this.props.deleteItemFromState(emp_id)
  //   })
  //   .catch(err => console.log(err));
  
  const array = new Array(3).fill(null);
  
  // const [open, setOpen] = useState('');
  // const toggle = (employee_Id) => {
  //   if (open === employee_Id) {
  //     setOpen('');
  //   } else {
  //     setOpen(employee_Id);
  //   }
  // };
  
  const onClickConfirm = () => {
    navigate('/ReportDetail');
  };

  return (
    <Container>
      <TableContainer>
        <TableStyle>
          <thead>
            <tr>
              <td>記入社名</td>
              <td className="border-left">{items.name}</td>
            </tr>
          </thead>
          <thead>
            <tr>
              <td>所属チームLD名</td>
              <td className="border-left">{items.name}{items.teamLdName}菊地　恭平LD</td>
            </tr>
          </thead>
          <thead>
            <tr>
              <td>ユーザ会社名</td>
              <td className="border-left">{items.userCompany}ユーザー株式会社</td>
            </tr>
          </thead>
          <thead>
            <tr>
              <td>元請会社名</td>
              <td className="border-left">{items.primeContractor}元請株式会社</td>
            </tr>
          </thead>
          <thead>
            <tr>
              <td>現場住所</td>
              <td className="border-left">{items.adress}東京都　新宿区　現在町　１－１－１</td>
            </tr>
          </thead>
          <thead>
            <tr>
              <td>定時</td>
              <td className="border-left">{items.regularTime}09：00～17:30</td>
            </tr>
          </thead>
          <thead>
            <tr>
              <td>自社担当営業</td>
              <td className="border-left">{items.salesEmployee}花岡MGR</td>
            </tr>
          </thead>
        </TableStyle>
      </TableContainer>
      <Flex justifyContent="center" alignItems="center" px={4} width="100%">
      <TableStyle>
                <tbody>
                  {array.map((_, index) => (
                    <tr key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ffffff" }}>
                      <td style={{ verticalAlign: 'middle' }}>
                        2024/07/08 ~ 2024/07/14
                      </td>
                      <td>
                        <Button color="primary" onClick={onClickConfirm}>
                          確認
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </TableStyle>
        {/* <AccordionContainer flush open={open} toggle={toggle}>
          <AccordionItem>
            <AccordionHeader targetId="1">2024/01 ~</AccordionHeader>
            <AccordionBody accordionId="1">
              <TableStyle>
                <tbody>
                  {array.map((_, index) => (
                    <tr key={index}>
                      <td style={{ verticalAlign: 'middle' }}>
                        2024/07/08 ~ 2024/07/14
                      </td>
                      <td>
                        <Button color="primary" onClick={onClickConfirm}>
                          確認
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </TableStyle>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="2">2023/01 ~ 2023/12</AccordionHeader>
            <AccordionBody accordionId="2">
              <TableStyle>
                <tbody>
                  {array.map((_, index) => (
                    <tr key={index}>
                      <td style={{ verticalAlign: 'middle' }}>
                        2024/07/08 ~ 2024/07/14
                      </td>
                      <td>
                        <Button color="primary" onClick={onClickConfirm}>
                          確認
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </TableStyle>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="3">2022/01 ~ 2022/12</AccordionHeader>
            <AccordionBody accordionId="3">
              <TableStyle>
                <tbody>
                  {array.map((_, index) => (
                    <tr key={index}>
                      <td style={{ verticalAlign: 'middle' }}>
                        2024/07/08 ~ 2024/07/14
                      </td>
                      <td>
                        <Button color="primary" onClick={onClickConfirm}>
                          確認
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </TableStyle>
            </AccordionBody>
          </AccordionItem>
        </AccordionContainer> */}
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
`;
/**
const AccordionContainer = styled(Accordion)`
  width: 100%;
`;
 */

const TableStyle = styled(Table)`
  width: 100%;
  .border-left {
    border-left: 2px solid #dcdcdc;
  }
`;

const TableContainer = styled.div`
  margin: 0 auto;
`;
