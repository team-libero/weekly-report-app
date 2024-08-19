import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { IoReturnDownBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const InfoGroup = ({ title, content }) => (
  <Flex
    direction="column"
    mb={3}
    backgroundColor="blue.100"
    px={2}
    borderRadius="8px"
  >
    <Text fontWeight="bold" mb={1}>
      {title}
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

const ReportDetail = () => {
  const navigate = useNavigate();

  const onClickReturn = () => {
    navigate(-1);
  };
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

        <InfoGroup title="氏名" content="山田太郎" />
        <InfoGroup title="所属チームLD名" content="XXLD" />
        <InfoGroup title="ユーザ会社名" content="株式会社アーキアテクノ" />
        <InfoGroup title="自社担当営業" content="志田 社長" />
        <InfoGroup title="元請会社名" content="株式会社アーキアテクノ" />
        <InfoGroup
          title="現場住所"
          content="東京都新宿区新宿1-11-5 不二越ビル4F"
        />
        <InfoGroup
          title="定時"
          content="HH:MM～HH:MM ※金曜日はHH:MM～HH:MMの定時退社日"
        />
      </Box>
    </>
  );
};

export default ReportDetail;
