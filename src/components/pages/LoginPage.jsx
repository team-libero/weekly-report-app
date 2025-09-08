import React from 'react';
import LoginForm from '../forms/LoginForm';
import { Box, Flex, Heading } from '@chakra-ui/react';

const LoginPage = () => {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" px={4}>
      <Box
        bg="white"
        p={8}
        maxW="md"
        borderRadius="lg"
        boxShadow="lg"
        textAlign="center"
      >
        <Heading as="h1" size="lg" mb={6}>
          週報システムログイン
        </Heading>
        <LoginForm />
        <u>
          <button className="link-button" onClick={() => alert('管理職に連絡してください')} style={alertStyles}>
            IDやパスワードを忘れてしまった場合
          </button>
        </u>
      </Box>
    </Flex>
  );
};

const alertStyles = {
  background: 'none',
    border: 'none',
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer',
    font: 'inherit',
    padding: 0
};

export default LoginPage;
