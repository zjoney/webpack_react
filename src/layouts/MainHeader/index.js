import React from 'react'
import { observer } from 'mobx-react';

import { appStores } from '@/stores';
import './style.less';
import { Layout, Row, Col, Icon } from 'antd';


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
            </Row>
        </Layout.Header>
    )
}

export default MainHeader;
