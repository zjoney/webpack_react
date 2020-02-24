import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react';
import { Layout, Menu, Icon, Row } from 'antd';

import { appStores } from '@/stores'
import './style.less';

const SiderMenu = ({ routes }) => {
    const { globalStore } = appStores();
    const [ openKeys, setOpenKeys ] = useState();
    const { pathname } = useLocation();
    const onOpenChange = keys => {
        setOpenKeys(keys);
    }
    return (
        <Layout.Sider
          trigger={null}
          collapsible
          collapsed={globalStore.collapsed}
          className="main-left-sider"
        >
            <Link to="/">
                <Row type="flex" align="middle" className="main-logo">
                    <Icon type="car" style={{ color: '13e367' }} />
                    {!globalStore.collapsed && <span className="app-name">{globalStore.appTitle}</span>}
                </Row>
            </Link>
            <Menu
              mode="inline"
              theme="dark"
              style={{paddingLeft: 0, marginBottom: 0}}
              className="main-menu"
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              selectedKeys={getSelectedKeys}
              >
                {routes}
              </Menu>
        </Layout.Sider>
    )
}

export default observer(SiderMenu);