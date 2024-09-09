import React, { useState } from 'react';
import {
  Box,
  Flex,
  Button,
  Text,
  Link,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Box bg="blue.500" px={4} py={3} color="white">
      <Flex alignItems="center" justifyContent="space-between">
        {/* ロゴセクション */}
        <Link href="/">
          <Text fontSize="lg" fontWeight="bold">
            週報アプリ
          </Text>
        </Link>

        {/* モバイルメニューのトグルボタン */}
        <IconButton
          icon={showMenu ? <CloseIcon /> : <HamburgerIcon />}
          variant="outline"
          aria-label="Toggle Navigation"
          display={{ base: 'block', md: 'none' }}
          onClick={toggleMenu}
        />

        {/* ナビゲーションメニュー（モバイルでは非表示） */}
        <Flex
          display={{ base: 'none', md: 'flex' }}
          alignItems="center"
          width="auto"
          mt={{ base: 4, md: 0 }}
        >
          <Link href="/reports" mx={2} display="block">
            週報一覧
          </Link>
          <Link href="/reportedit" mx={2} display="block">
            週報登録/更新
          </Link>
          <Link href="/employeelist" mx={2} display="block">
            社員一覧
          </Link>
        </Flex>

        {/* ログインボタン（モバイルでは非表示） */}
        <Button
          colorScheme="teal"
          variant="solid"
          display={{ base: 'none', md: 'block' }}
        >
          ログアウト
        </Button>
      </Flex>

      {/* モバイルメニューが表示されたときのメニュー */}
      {showMenu && (
        <Box
          display={{ base: 'block', md: 'none' }}
          bg="blue.600"
          p={4}
          position="absolute"
          top="60px" // ヘッダーの下にメニューを表示
          left="0"
          right="0"
          zIndex="10"
        >
          <VStack spacing={4} align="start">
            <Link href="/reports" w="100%">
              週報一覧
            </Link>
            <Link href="/reportedit" w="100%">
              週報登録/更新
            </Link>
            <Link href="/employeelist" w="100%">
              社員一覧
            </Link>
            <Button colorScheme="teal" variant="solid" w="20%">
              ログアウト
            </Button>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default Header;
