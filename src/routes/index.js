import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { OverlayRouteTransition } from '../transitions';

import {
  AppContainer,
  HomeContainer,
  TeamContainer,
  ProjectDetailContainer,
  ProjectListContainer,
} from '../containers';

const ScrollToTop = withRouter(class extends Component {
  componentDidUpdate({ location }) {
    if (this.props.location !== location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
});

export default (
  <ScrollToTop>
    <AppContainer>
      <OverlayRouteTransition routes={[
        { path: "/", component: HomeContainer },
        { path: "/our-work", component: ProjectListContainer },
        { path: "/our-work/:projectId", component: ProjectDetailContainer },
        { path: "/team", component: TeamContainer }
      ]} defaultRoute={HomeContainer} />
    </AppContainer>
  </ScrollToTop>
);
