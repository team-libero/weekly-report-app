import React from 'react';
import { Box, Heading, Text, Button, VStack, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Box
      textAlign="center"
      py={10}
      px={6}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bg="gray.50"
    >
      {/* 404タイトル */}
      <Heading
        display="inline-block"
        as="h1"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        404
      </Heading>

      {/* ページが見つかりませんメッセージ */}
      <Text fontSize="18px" mt={3} mb={2}>
        ページが見つかりません
      </Text>
      <Text color={'gray.500'} mb={6}>
        お探しのページは存在しないか、移動した可能性があります。
      </Text>

      {/* ホームに戻るボタン */}
      <VStack spacing={3}>
        <Link to="/">
          <Button
            colorScheme="teal"
            bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
            color="white"
            variant="solid"
          >
            ホームに戻る
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default NotFoundPage;
