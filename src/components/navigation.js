import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { getModifiersWithBoolValue } from '../utilities/modifier-generators';
import { withBem } from '../hocs';
import { Grid } from './layout';
import Menu from './menu';
import SvgIcon from './svg-icon';
import logoIcon from 'assets/icons/logo.svg';

const Navigation = ({ inverted, cn, className, ...rest }) => (
  <div {...rest} className={classnames(cn(String(), getModifiersWithBoolValue({ inverted })), className)}>
    <Grid className={cn('inner')}>
      <div className={cn('logo')}>
        <Link to={'/'} title="King Street Apps">
          <SvgIcon symbol={logoIcon} />
        </Link>
      </div>
      <div className={cn('menu-wrapper')}>
        <Menu inverted={inverted} />
      </div>
    </Grid>
  </div>
);

export default withBem('nav')(Navigation);
