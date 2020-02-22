import React from 'react';
import { Layout } from 'antd';
import SiderMenu from '../SiderMenu';


import './style.less';

const BasicLayout = ({route}) => {
    console.log();
    return (
        <Layout className="main-layout">
            <SiderMenu routes={route.childRoutes} />
        </Layout>
    )
}
export default BasicLayout;

