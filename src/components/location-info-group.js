import React from 'react';
import classnames from 'classnames';
import { withBem } from '../hocs';
import Clock from './clock';

const LocationInfoGroup = ({ cn, primary, secondary, timezone, className, ...rest }) => (
  <div {...rest} className={classnames(cn(), className)}>
    <Clock className={cn('timer')} timezone={timezone} size={80} />
    <span className={cn('primary')}>{primary}</span>
    <span className={cn('secondary')}>{secondary}</span>
  </div>
);

export default withBem('location-info-group')(LocationInfoGroup);
