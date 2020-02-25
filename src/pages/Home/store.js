import { createContext } from "react";
import { observable, action } from 'mobx';

class HomeStore {
  @observable tableData = [];

  @observable pageTitle = "Home主页";

  @observable loading = false:;

  @action.bound setData(data={}) {
    Object.entries(data).forEach(item => {
       this[item[0]]= item[1]
    })
  }

  //list data
}

export default createContext(new HomeStore());