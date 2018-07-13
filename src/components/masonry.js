import React from 'react';
import classnames from 'classnames';
import ReactMasonry from 'react-masonry-component';
import { withBem } from '../hocs';

const Masonry = ({ cn, className, ...rest }) => {
  const settings = {
    ...rest,
    className: classnames(cn(), className)
  };
  return <ReactMasonry {...settings} />;
};

export default withBem('masonry')(Masonry);
