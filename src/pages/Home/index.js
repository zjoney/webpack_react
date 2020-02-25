import React, { useContext, useState, useEffect } from 'react';

import Store from './store';
import './style.less';

const HomePage = () => {
  const pageStore = useContext(Store);
  const [num, setNum] = useState(0);

  useEffect(() => {
    pageStore.qryTableData();
  }, [])
  return (
    <div className="page-home page-content">
      <h2>{pageStore.pageTitle}</h2>
      <div>
        <span>num值：{num}</span>
        <Button
          type="primary"
          size="small"
          style={{marginLeft: 10 }}
          onClick={() => setNum(num +1 )}
        >
          add
        </Button>
      </div>
      Home demo
    </div>
  );
};

export default HomePage;
