import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { kebabCase, mapKeys } from 'lodash';
import { withBem } from '../../hocs';

const Row = ({
  cn,
  className,
  children,
  ...modifiers
}) => (
  <div className={classnames(cn('row', mapKeys({ ...modifiers }, (_, key) => kebabCase(key))), className)}>
    {children}
  </div>
);

Row.propTypes = {
  noGutters: PropTypes.bool,
  alignStart: PropTypes.bool,
  alignCenter: PropTypes.bool,
  alignEnd: PropTypes.bool,
  justifyStart: PropTypes.bool,
  justifyCenter: PropTypes.bool,
  justifyAround: PropTypes.bool,
  justifyBetween: PropTypes.bool,
};

Row.defaultProps = {
  noGutters: false,
  alignStart: false,
  alignCenter: false,
  alignEnd: false,
  justifyStart: false,
  justifyCenter: false,
  justifyAround: false,
  justifyBetween: false,
};

export default withBem('grid')(Row);
