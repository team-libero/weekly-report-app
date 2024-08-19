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
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const navigate = useNavigate();

  const onClickConfirm = () => {
    navigate('/ReportDetail');
  };

  return (
    <div>
      <Accordion flush open={open} toggle={toggle}>
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
      </Accordion>
    </div>
  );
};

const TableStyle = styled(Table)`
  width: 50%;
`;
