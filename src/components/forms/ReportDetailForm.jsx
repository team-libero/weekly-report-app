import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoReturnDownBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const InfoGroup = ({ title, content }) => (
  <Flex
    direction="column"
    mb={3}
    backgroundColor="blue.100"
    px={2}
    borderRadius="8px"
  >
    <Text fontWeight="bold" mb={1}>
      ■{title}
    </Text>
    <Text ml={4}>{content}</Text>
  </Flex>
);

const styledButtonStyles = {
  backgroundColor: '#2b6cb0',
  color: 'white',
  padding: '12px 24px',
  marginRight: '4px',
  _hover: {
    backgroundColor: '#2c5282',
  },
};

const styledEditButtonStyles = {
  backgroundColor: '#d69e2e',
  color: 'white',
  padding: '12px 24px',
  marginRight: '4px',
  _hover: {
    backgroundColor: '#b7791f',
  },
};

const ReportDetailForm = (e) => {
  const [item, setItem] = useState('');

  //const [input_error, setInputErrorState] = useState(false);

  const navigate = useNavigate();

  const onClickReturn = () => {
    navigate(-1);
  };

  //TODO リクエストパラメータから取得するように修正
  const reportId = '2';
  if (item === '') {
    // 初期表示の場合のみAPIで週報情報を取得
    fetch(
      `${process.env.REACT_APP_API_ROOT}/reports/reportDetail?reportId=${reportId}`
    )
      .then((response) => response.json())
      .then((items) => {
        console.log(items);
        if (items.length > 0 && !items.dataExists) {
          console.log(items[0]);
          setItem(items[0]);
          console.log(item);
        } else {
          // 画面遷移の抑制
          //e.preventDefault();
          console.log('dataExists');
          //setInputErrorState(true);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" p={4}>
        <Button
          bg="gray.300"
          _hover={{ bg: 'gray.400' }}
          onClick={onClickReturn}
        >
          <IoReturnDownBack />
        </Button>
        <Flex space-x-4>
          <Button sx={styledButtonStyles}>先週</Button>
          <Button sx={styledButtonStyles}>翌週</Button>
          <Button sx={styledEditButtonStyles}>編集</Button>
        </Flex>
      </Flex>
      <Box p={4} bg="gray.200" borderRadius="md">
        <Heading size="md" mb={4}>
          現場基本情報
        </Heading>

        <InfoGroup
          title="氏名"
          content={`${item.emp_lname} ${item.emp_fname}`}
        />
        <InfoGroup
          title="所属チームLD名"
          content={`${item.leader_emp_lname} ${item.leader_emp_fname}`}
        />
        <InfoGroup title="ユーザ会社名" content={item.user_company_name} />
        <InfoGroup
          title="自社担当営業"
          content={`${item.sales_emp_lname} ${item.sales_emp_fname}`}
        />
        <InfoGroup title="元請会社名" content={item.prime_contractor_name} />
        <InfoGroup title="現場住所" content={item.onsite_address} />
        <InfoGroup title="定時" content={item.fixed_time} />
      </Box>
      <Box p={4} bg="gray.200" borderRadius="md">
        <Heading size="md" mb={4}>
          営業に関する情報
        </Heading>

        <InfoGroup title="情報源" content={item.source_of_sales_info} />
        <InfoGroup title="情報収集" content={item.how_to_collect_sales_info} />
        <InfoGroup title="営業に関する情報" content={item.sales_info} />
      </Box>
      <Box p={4} bg="gray.200" borderRadius="md">
        <Heading size="md" mb={4}>
          業務内容
        </Heading>

        <InfoGroup title="平均残業時間" content={item.avg_overtime} />
        <InfoGroup title="作業内容" content={item.work_content} />
        <InfoGroup
          title="最低稼働時間"
          content={`${item.minimun_work_time}時間　${
            item.reachability === '1' ? '達成できる' : '達成できない'
          }`}
        />
      </Box>
    </>
  );
};

export default ReportDetailForm;
