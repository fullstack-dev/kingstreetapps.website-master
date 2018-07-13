import React, { Component } from "react";
import { Transition } from 'react-transition-group';

export const withOverlayTransition = (WrappedComponent) => ({ cn }) => {
  return class extends Component {
    render() {
      return (
        <div className={cn()}>
          <div className={cn('wrapper')}>
            <WrappedComponent {...this.props} />
          </div>
          <div className={cn('overlay')}></div>
        </div>
      );
    }
  }
};
