/**
 * SVG-tag Icon React Component
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgIcon = ({
  symbol,
  className,
  ...rest
}) => (
  <svg {...rest} aria-hidden="true" className={classnames('icon', className)}>
    <use xlinkHref={symbol && ("#" + symbol.id)}></use>
  </svg>
);

SvgIcon.propTypes = {
  symbol: PropTypes.object.isRequired,
  // ^ BrowserSpriteSymbol object
  className: PropTypes.string,
  // ^ any additional css classes to add to the component
};

export default SvgIcon;
