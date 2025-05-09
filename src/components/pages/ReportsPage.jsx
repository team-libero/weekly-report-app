import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Table,
} from 'reactstrap';
import styled from 'styled-components';

export const ReportsPage = () => {
  const array = new Array(3).fill(null);
  const [open, setOpen] = useState('');
  const toggle = (id) => {
    if (open === id) {
      setOpen('');
    } else {
      setOpen(id);
    }
  };
  const navigate = useNavigate();

  const onClickConfirm = () => {
    navigate('/ReportDetail');
  };

  const test = () => {
    navigate('/reportedit?reportId=15');
  };

  return (
    <Container>
      <Button color="primary" onClick={test}>
        週報更新画面遷移テスト
      </Button>
      <TableContainer>
        <TableStyle>
          <thead>
            <tr>
              <td>列A</td>
              <td className="border-left">列B</td>
            </tr>
          </thead>
          <thead>
            <tr>
              <td>列A</td>
              <td className="border-left">列B</td>
            </tr>
          </thead>
          <thead>
            <tr>
              <td>列A</td>
              <td className="border-left">列B</td>
            </tr>
          </thead>
        </TableStyle>
      </TableContainer>
      <Flex justifyContent="center" alignItems="center" px={4} width="100%">
        <AccordionContainer flush open={open} toggle={toggle}>
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
        </AccordionContainer>
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
`;

const AccordionContainer = styled(Accordion)`
  width: 100%;
`;

const TableStyle = styled(Table)`
  width: 100%;
  .border-left {
    border-left: 2px solid #dcdcdc;
  }
`;

const TableContainer = styled.div`
  margin: 0 auto;
`;
