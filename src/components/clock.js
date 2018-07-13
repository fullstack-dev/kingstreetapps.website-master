import React, { Component } from 'react';
import classnames from 'classnames';
import ReactClock from 'react-clock';
import { withBem } from '../hocs';
import { getTimezoneDifferenceInMinutesFromLocal } from '../utilities/timezone';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.timezoneDiffInMinutes = getTimezoneDifferenceInMinutesFromLocal(props.timezone);
    this.state = {
      value: this.getNowInTimezone(this.timezoneDiffInMinutes)
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ value: this.getNowInTimezone(this.timezoneDiffInMinutes) });
    }, 1000);
  }

  render() {
    const { cn, timezone, className, ...rest } = this.props;
    const settings = {
      ...rest,
      value: this.state.value,
      renderMinuteMarks: false,
      hourMarksWidth: 2,
      hourMarksLength: 25,
      hourHandWidth: 4,
      hourHandLength: 50,
      hourHandOppositeLength: 15,
      minuteHandWidth: 4,
      minuteHandLength: 60,
      minuteHandOppositeLength: 20,
      secondHandWidth: 2,
      secondHandLength: 71,
      secondHandOppositeLength: 20,
      className: classnames(cn(), className),
    };
    return <ReactClock {...settings} />;
  }

  getNowInTimezone(timezoneDiffInMinutes) {
    const now = new Date();
    return new Date(now.getTime() + timezoneDiffInMinutes * 60000);
  }
};

export default withBem('clock')(Clock);
