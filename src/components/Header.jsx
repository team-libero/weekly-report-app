import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, Flex, Button, Text, IconButton, VStack } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { UserContext } from './contexts/UserContext';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { pathname } = useLocation();
  const {
    role,
    department_id,
    department_name,
    team_name,
    emp_lname,
    emp_fname,
    setEmployeeId,
    setRole,
    setDepartmentId,
    setDepartmentName,
    setTeamName,
    setEmpLname,
    setEmpFname,
  } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    // UserContextの削除
    setEmployeeId('');
    setRole('');
    setDepartmentId('');
    setDepartmentName('');
    setTeamName('');
    setEmpLname('');
    setEmpFname('');

    navigate('/');
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
    <Box bg="blue.500" px={4} py={2} color="white">
      <Flex alignItems="center" justifyContent="space-between">
        <Box flex="0 0 200px">
          <Text fontSize="lg" fontWeight="bold">
            週報アプリ
          </Text>
        </Box>

        <Flex
          display={{ base: 'none', md: 'flex' }}
          justifyContent="center"
          alignItems="center"
        >
          {department_id === '2' && (
            <>
              <Box as={Link} to={'/reports'} {...getLinkStyle('/reports')}>
                週報一覧
              </Box>

              <Box
                as={Link}
                to={'/reportedit'}
                {...getLinkStyle('/reportedit')}
              >
                週報登録/更新
              </Box>
            </>
          )}
          {(department_id === '1' ||
            (department_id === '2' && role !== '1')) && (
            <Box
              as={Link}
              to={'/employeelist'}
              {...getLinkStyle('/employeelist')}
            >
              社員一覧
            </Box>
          )}
        </Flex>

        <Flex alignItems="center">
          <Box display={{ base: 'none', md: 'block' }}>
            <Flex justifyContent="flex-end" alignItems="center">
              <Box mr={6}>
                <div>
                  氏名　　：{emp_lname} {emp_fname}
                </div>
                <div>チーム名：{team_name}</div>
                <div>部署　　：{department_name}</div>
              </Box>
              <Button colorScheme="teal" variant="solid" onClick={handleLogout}>
                ログアウト
              </Button>
            </Flex>
          </Box>

          <IconButton
            icon={showMenu ? <CloseIcon /> : <HamburgerIcon />}
            variant="outline"
            aria-label="Toggle Navigation"
            display={{ base: 'block', md: 'none' }}
            onClick={toggleMenu}
            ml={{ base: 2, md: 0 }}
          />
        </Flex>
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
            {department_id === '2' && (
              <>
                <Box
                  as={Link}
                  to={'/reports'}
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
              </>
            )}

            {(department_id === '1' ||
              (department_id === '2' && role !== '1')) && (
              <Box
                as={Link}
                to={'/employeelist'}
                w="100%"
                p="2"
                _hover={{ bg: 'blue.700', textDecoration: 'none' }}
                _focus={{ bg: 'blue.700', boxShadow: 'none' }}
              >
                社員一覧
              </Box>
            )}
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={handleLogout}
              w="auto"
            >
              ログアウト
            </Button>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default Header;
