import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  cssTransitionClasses,
  withOverlayTransition
} from '../';
import { map } from 'lodash';
import createBemClass from 'react-bem-builder';

const OVERLAY_CLASSNAME = 'overlay-transition';

export const OverlayRouteTransition = ({ routes, defaultRoute }) => {
  const routeComponent = (component) => withOverlayTransition(component)({
    cn: createBemClass(OVERLAY_CLASSNAME)
  });

  return (
    <Route render={({ location }) => (
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.key}
          classNames={cssTransitionClasses(OVERLAY_CLASSNAME)}
          appear={true}
          timeout={350}>
          <Switch location={location}>
            {map(routes, ({ path, component }) => (
              <Route exact path={path} component={routeComponent(component)} />
            ))}
            <Route component={routeComponent(defaultRoute)} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )} />
  );
};
