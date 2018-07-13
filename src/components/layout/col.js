import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { assignIn } from 'lodash';
import { getModifiers } from '../../utilities/modifier-generators';
import { withBem } from '../../hocs';

const Col = ({
  cn,
  className,
  children,
  alignSelfStart,
  alignSelfCenter,
  alignSelfEnd,
  xs,
  sm,
  md,
  lg,
  xl,
  ...rest,
}) => (
  <div {...rest} className={classnames(cn('col', getModifiers({ xs, sm, md, lg, xl }, { alignSelfStart, alignSelfCenter, alignSelfEnd })), className)}>
    {children}
  </div>
);

Col.propTypes = {
  alignSelfStart: PropTypes.bool,
  alignSelfCenter: PropTypes.bool,
  alignSelfEnd: PropTypes.bool,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
};

Col.defaultProps = {
  alignSelfStart: false,
  alignSelfCenter: false,
  alignSelfEnd: false,
};

export default withBem('grid')(Col);
