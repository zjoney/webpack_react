import React from 'react';
import { Layout } from 'antd';
import SiderMenu from '../SiderMenu';
import MainHeader from '../MainHeader';

import './style.less';

const BasicLayout = ({ route, children }) => {
    console.log();
    return (
        <Layout className="main-layout">
            <SiderMenu routes={route.childRoutes} />
            <Layout className="main-layout-right">
                <MainHeader />
                <Layout.Content className="main-layout-content">
                    {children}
                </Layout.Content>
            </Layout>
        </Layout>
    )
}
export default BasicLayout;

