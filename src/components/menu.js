import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { getModifiersWithBoolValue } from '../utilities/modifier-generators';
import { withBem } from '../hocs';

const Menu = ({ inverted, cn, className, ...rest }) => (
  <ul {...rest} className={classnames(cn(String(), getModifiersWithBoolValue({ inverted })), className)}>
    <li className={cn('item')}><Link to={`/`}>Home</Link></li>
    <li className={cn('item')}><Link to={`/our-work`}>Our work</Link></li>
    <li className={cn('item')}><Link to={`/team`}>Our team</Link></li>
  </ul>
);

export default withBem('menu')(Menu);
