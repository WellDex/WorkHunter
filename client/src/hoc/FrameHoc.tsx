import {Card} from '@mui/material';
import React from 'react';

const FrameHoc =
  (Component: React.FunctionComponent) =>
  ({...props}) =>
    (
      <Card>
        <Component {...props} />
      </Card>
    );

export default FrameHoc;
