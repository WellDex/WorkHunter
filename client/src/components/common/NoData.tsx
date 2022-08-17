import React from 'react';
import NoDataImg from '../../assets/image/nodata.png';

const NoData = () => {
  return (
    <div className="noData">
      <img src={NoDataImg} />
      <span>No Data</span>
    </div>
  );
};

export default NoData;
