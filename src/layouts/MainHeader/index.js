import React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react';

import { appStores } from '@/stores';
import './style.less';
import { Layout, Row, Col, Icon, Dropdown, Menu } from 'antd';

const menu = () => (
 <Menu>
     <Menu.Item key="0">
        <Icon type="smile" />
         个人信息
     </Menu.Item>
     <Menu.Divider />
     <Menu.Item KEY="1">
         <Link to="/login">
             <Icon type="logout" />
             退出登录
         </Link>
     </Menu.Item>
 </Menu>
);

const MainHeader = () => {
    console.log('')
    const { globalStore } = appStores();
    return (
        <Layout.Header className="main-header">
            <Row type="flex" style={{paddingRight: 20}}>
               <Col style={{flex: 1}}>
                  <Icon 
                    className="trigger"
                    type={globalStore.collapsed ? 'menu-unfold':'meu-fold'}
                    onClick={globalStore.toggleCollapsed}

                  />
               </Col>
               <Col>
                <Dropdown overlay={menu} trigger={['click', 'hover']} placement="bottomCenter">
                    <div className="user-info">
                       <span className="user-img" />
    <span className="user-info">{globalStore.userInfo.loginName}</span>
                    </div>
                </Dropdown>
               </Col>
            </Row>
        </Layout.Header>
    )
}

export default MainHeader;
