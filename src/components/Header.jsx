import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Flex, Button, Text, IconButton, VStack } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { UserContext } from './contexts/UserContext';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { pathname } = useLocation();
  const { employeeId, role } = useContext(UserContext);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // 週報一覧押下時API呼び出し
  const fetchReportsList = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ROOT}/reports?employeeId=${employeeId}&pageNo=1`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching reports list:', error);
    }
  };

  // 週報登録・更新押下時API呼び出し
  const fetchReportEdit = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ROOT}/reportedit`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching report edit:', error);
    }
  };

  // 社員一覧押下時API呼び出し
  const fetchEmployeeList = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ROOT}/employeelist?employeeId=${employeeId}&role=${role}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching employee list:', error);
    }
  };

  // URLパラメータ生成
  // 週報一覧押下
  const getReportsListUrl = () => {
    const params = new URLSearchParams();
    if (employeeId) params.append('employeeId', employeeId);
    if (role) params.append('role', role);
    return `/reports${params.toString() ? `?${params.toString()}` : ''}`;
  };

  // 社員一覧押下
  const getEmployeeListUrl = () => {
    const params = new URLSearchParams();
    if (role) params.append('role', role);
    return `/employeelist${params.toString() ? `?${params.toString()}` : ''}`;
  };

  const getLinkStyle = (path) => ({
    mx: 5,
    display: 'block',
    p: '2',
    borderRadius: 'md',
    transition: 'all 0.2s',
    bg: pathname === path ? 'blue.600' : 'transparent',
    _hover: {
      textDecoration: 'none',
      bg: pathname === path ? 'blue.700' : 'blue.600',
    },
    _focus: {
      textDecoration: 'none',
      bg: pathname === path ? 'blue.700' : 'blue.600',
      boxShadow: 'none',
      outline: 'none',
    },
  });

  return (
    <Box bg="blue.500" px={4} py={3} color="white">
      <Flex alignItems="center" justifyContent="space-between">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Text fontSize="lg" fontWeight="bold">
            週報アプリ
          </Text>
        </Link>

        <IconButton
          icon={showMenu ? <CloseIcon /> : <HamburgerIcon />}
          variant="outline"
          aria-label="Toggle Navigation"
          display={{ base: 'block', md: 'none' }}
          onClick={toggleMenu}
        />

        <Flex
          display={{ base: 'none', md: 'flex' }}
          alignItems="center"
          width="auto"
          mt={{ base: 4, md: 0 }}
        >
          <Box
            as={Link}
            to={getReportsListUrl()}
            {...getLinkStyle('/reports')}
            onClick={fetchReportsList}
          >
            週報一覧
          </Box>
          <Box
            as={Link}
            to={'/reportedit'}
            {...getLinkStyle('/reportedit')}
            onClick={fetchReportEdit}
          >
            週報登録/更新
          </Box>

          <Box
            as={Link}
            to={getEmployeeListUrl()}
            {...getLinkStyle('/employeelist')}
            onClick={fetchEmployeeList}
          >
            社員一覧
          </Box>
        </Flex>

        <Button
          colorScheme="teal"
          variant="solid"
          display={{ base: 'none', md: 'block' }}
        >
          ログアウト
        </Button>
      </Flex>

      {showMenu && (
        <Box
          display={{ base: 'block', md: 'none' }}
          bg="blue.600"
          p={4}
          position="absolute"
          top="60px"
          left="0"
          right="0"
          zIndex="10"
        >
          <VStack spacing={4} align="start">
            <Box
              as={Link}
              to={getReportsListUrl()}
              w="100%"
              p="2"
              _hover={{ bg: 'blue.700', textDecoration: 'none' }}
              _focus={{ bg: 'blue.700', boxShadow: 'none' }}
              onClick={fetchReportsList}
            >
              週報一覧
            </Box>
            <Box
              as={Link}
              to={'/reportedit'}
              w="100%"
              p="2"
              _hover={{ bg: 'blue.700', textDecoration: 'none' }}
              _focus={{ bg: 'blue.700', boxShadow: 'none' }}
              onClick={fetchReportEdit}
            >
              週報登録/更新
            </Box>
            <Box
              as={Link}
              to={getEmployeeListUrl()}
              w="100%"
              p="2"
              _hover={{ bg: 'blue.700', textDecoration: 'none' }}
              _focus={{ bg: 'blue.700', boxShadow: 'none' }}
              onClick={fetchEmployeeList}
            >
              社員一覧
            </Box>
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
