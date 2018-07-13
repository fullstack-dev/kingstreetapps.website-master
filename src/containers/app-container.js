import React, { Fragment } from 'react';
import { Footer } from '../components';

export default ({
  children
}) => (
  <Fragment>
    {children}
    <Footer />
  </Fragment>
);
