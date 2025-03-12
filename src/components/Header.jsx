import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, Flex, Button, Text, IconButton, VStack } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { UserContext } from './contexts/UserContext';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const { pathname } = useLocation();
  const {
    employeeId,
    role,
    setEmployeeId,
    setRole,
    employeeName,
    setEmployeeName,
  } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    setEmployeeId('');
    setRole('');
    navigate('/');
  };

  const getReportsListUrl = () => {
    const params = new URLSearchParams();
    if (employeeId) params.append('employeeId', employeeId);
    if (role) params.append('role', role);
    return `/reports${params.toString() ? `?${params.toString()}` : ''}`;
  };

  const getEmployeeListUrl = () => {
    const params = new URLSearchParams();
    if (role) params.append('role', role);
    return `/employeelist${params.toString() ? `?${params.toString()}` : ''}`;
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_ROOT}/header/get?employeeId=${employeeId}`
        );
        const data = await res.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    getItems();
  }, [employeeId]);

  //テスト
  useEffect(() => {
    console.log(userInfo);
  });

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
    <Box bg="blue.500" px={4} py={2} color="white">
      <Flex alignItems="center">
        <Box flex="0 0 200px">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Text fontSize="lg" fontWeight="bold">
              週報アプリ
            </Text>
          </Link>
        </Box>

        <IconButton
          icon={showMenu ? <CloseIcon /> : <HamburgerIcon />}
          variant="outline"
          aria-label="Toggle Navigation"
          display={{ base: 'block', md: 'none' }}
          onClick={toggleMenu}
        />

        <Flex
          display={{ base: 'none', md: 'flex' }}
          flex="1"
          justifyContent="center"
          alignItems="center"
        >
          <Box as={Link} to={getReportsListUrl()} {...getLinkStyle('/reports')}>
            週報一覧
          </Box>
          <Box as={Link} to={'/reportedit'} {...getLinkStyle('/reportedit')}>
            週報登録/更新
          </Box>
          {role !== '1' && (
            <Box
              as={Link}
              to={getEmployeeListUrl()}
              {...getLinkStyle('/employeelist')}
            >
              社員一覧
            </Box>
          )}
        </Flex>

        <Box flex display={{ base: 'none', md: 'block' }}>
          <Flex justifyContent="flex-end" alignItems="center">
            <Box mr={6}>
              <div>
                氏名　　：{userInfo.emp_lname} {userInfo.emp_fname}
              </div>
              <div>チーム名：{userInfo.team_name}</div>
              <div>部署　　：{userInfo.department_name}</div>
            </Box>
            <Button colorScheme="teal" variant="solid" onClick={handleLogout}>
              ログアウト
            </Button>
          </Flex>
        </Box>
      </Flex>

      {/* モバイルメニュー */}
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
