import React from 'react';
import classnames from 'classnames';
import ReactSlider from 'react-slick';
import { withBem } from '../hocs';
import SvgIcon from './svg-icon';
import rightArrowIcon from 'assets/icons/arrow-right.svg';

const Slider = ({ cn, className, ...rest }) => {
  const settings = {
    ...rest,
    prevArrow: <span><SvgIcon symbol={rightArrowIcon} className={cn('prev-arrow')} /></span>,
    nextArrow: <span><SvgIcon symbol={rightArrowIcon} className={cn('next-arrow')} /></span>,
    className: classnames(cn(), className)
  };
  return <ReactSlider {...settings} />;
};

export default withBem('slider')(Slider);
