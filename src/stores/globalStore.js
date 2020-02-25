// import React  from 'react';
import { observable, action } from 'mobx';

export default class GlobalStore {
    @observable appTitle = '管理平台';

    @observable collapsed = false;

    @observable userInfo = {
        loginName: 'zjone',

    };

    @action.bound toggleCollapsed() {
        this.collapsed = !this.collapsed;
    }

    @action.bound setData(data = {}) {
        Object.entries(data).forEach(item=>{
            this[item[0]] = item[1]
        })
    }
}

