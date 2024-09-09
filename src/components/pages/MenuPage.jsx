import React, { useState } from 'react';
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';
import { styled } from 'styled-components';
import classNames from 'classnames';
import { ReportsPage } from './ReportsPage';
import EmployeeListPage from './EmployeeListPage';
import { ReportEditPage } from './ReportEditPage';

// 多分使わないので消す

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const [adminFlg, setAdminFlg] = useState(true);

  return (
    <ContainerStyle>
      <Nav tabs>
        <NavStyle>
          <NavLink
            className={classNames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            週報一覧
          </NavLink>
        </NavStyle>
        <NavStyle>
          <NavLink
            className={classNames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            週報登録/更新
          </NavLink>
        </NavStyle>
        {adminFlg && (
          <NavStyle>
            <NavLink
              className={classNames({ active: activeTab === '3' })}
              onClick={() => {
                toggle('3');
              }}
            >
              ユーザー選択
            </NavLink>
          </NavStyle>
        )}
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <ReportsPage />
        </TabPane>
        <TabPane tabId="2">
          <ReportEditPage />
        </TabPane>
        <TabPane tabId="3">
          <EmployeeListPage />
        </TabPane>
      </TabContent>
    </ContainerStyle>
  );
};

const NavStyle = styled(NavItem)`
  &:hover {
    cursor: pointer;
  }
`;
const ContainerStyle = styled(Container)`
  margin: auto;
`;

export default MenuPage;
