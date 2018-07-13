import React from 'react';
import classnames from 'classnames';
import { getModifiersWithBoolValue } from '../utilities/modifier-generators';
import { withBem } from '../hocs';
import Navigation from './navigation';
import Section from './section';

const Header = ({
  cn,
  className,
  children,
  dark,
  noTopSpacing,
  ...rest,
}) => (
  <header {...rest} className={classnames(cn(String(), getModifiersWithBoolValue({ dark, noTopSpacing })), className)}>
    <Navigation inverted={dark} className={cn('nav')} />
    <Section dark={dark} className={cn('content')}>
      {children}
    </Section>
  </header>
);

export default withBem('header')(Header);
