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
          <a href="https://www.google.com/">
            IDやパスワードを忘れてしまった場合
          </a>
        </u>
      </Box>
    </Flex>
  );
};

export default LoginPage;
