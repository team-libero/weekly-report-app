import { Box, Button, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate('/');
  };

  return (
    <Flex
      minH="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <VStack textAlign="center" mb={8} spacing={4}>
        <Heading as="h1" size="xl" fontWeight="bold">
          アクセス権限がありません
        </Heading>
        <Text color="gray.600">
          申し訳ありませんが、このページにアクセスする権限がないようです。
        </Text>
      </VStack>

      <Button
        onClick={handleReturn}
        bg="blue.600"
        color="white"
        _hover={{ bg: 'blue.700' }}
        leftIcon={<Box as={Home} h={4} w={4} />}
      >
        ホームへ戻る
      </Button>
    </Flex>
  );
}
