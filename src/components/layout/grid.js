import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { kebabCase, mapKeys } from 'lodash';
import { withBem } from '../../hocs';
import Row from './row';
import Col from './col';

const Grid = ({
  cn,
  className,
  children,
  ...modifiers
}) => (
  <div className={classnames(cn(String(), mapKeys({ ...modifiers }, (_, key) => kebabCase(key))), className)}>
    {children}
  </div>
);

Grid.propTypes = {
  fluid: PropTypes.bool,
  noGutters: PropTypes.bool,
};

Grid.defaultProps = {
  fluid: false,
  noGutters: false,
};

Grid.Row = Row;
Grid.Col = Col;

export default withBem('grid')(Grid);
