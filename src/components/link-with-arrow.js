import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { withBem } from '../hocs';
import SvgIcon from './svg-icon';
import rightArrowIcon from 'assets/icons/arrow-right.svg';

const LinkWithArrow = ({ to, cn, className, children, ...rest }) => {
  const rightArrow = <SvgIcon symbol={rightArrowIcon} className={cn('icon')} />;
  if (to) {
    return (
      <Link {...rest} to={to} className={classnames(cn(), className)}>
        {children}
        {rightArrow}
      </Link>
    );
  } else {
    return (
      <a {...rest} className={classnames(cn(), className)}>
        {children}
        {rightArrow}
      </a>
    );
  }
}

export default withBem('link-with-arrow')(LinkWithArrow);
