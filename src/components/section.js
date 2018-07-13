import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withBem } from '../hocs';
import { Grid } from './layout';

const Section = ({
  cn,
  dark,
  fluid,
  noGutters,
  className,
  children,
  ...rest
}) => (
  <div {...rest} className={classnames(cn(String(), { dark }), className)}>
    <Grid
      fluid={fluid}
      noGutters={noGutters}
      className={cn('inner')}
    >
      {children}
    </Grid>
  </div>
);

Section.propTypes = {
  fluid: PropTypes.bool,
  noGutters: PropTypes.bool,
  dark: PropTypes.bool,
};

Section.defaultProps = {
  dark: false,
};

export default withBem('section')(Section);
