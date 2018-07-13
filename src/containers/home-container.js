import React, { Component, Fragment, compose } from 'react';
import { connect } from 'react-redux';
import createBemClass from 'react-bem-builder';
import { map, reverse, slice } from 'lodash';
import { Header, LocationInfoGroup, Section, Link, Project, Slider } from '../components';
import Fade from 'react-reveal/Fade';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { cssTransitionClasses } from '../transitions/utilities/transition-utility';

const headerBlock = createBemClass('home-header');
const projectsBlock = createBemClass('home-section-projects');
const strategyBlock = createBemClass('home-section-strategy');

class HomeContainer extends Component {
  render() {
    return (
      <Fragment>
        {this.renderHeader()}
        <TransitionGroup component={null}>
          <CSSTransition
            key={'home-page-content'}
            classNames={cssTransitionClasses('home-page-content')}
            appear={true}
            timeout={350}>
            <div>
              {this.renderProjectCarouselSection()}
              {this.renderStrategySection()}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }

  renderHeader() {
    return (
      <Header className={headerBlock()} dark noTopSpacing>
        <TransitionGroup component={null}>
          <CSSTransition
            key={'home-header'}
            classNames={cssTransitionClasses(headerBlock('content'))}
            appear={true}
            timeout={350}>
            <div className={headerBlock('content')}>
              <h1 className={headerBlock('heading')}>
                Next generation<br/>
                digital products<br/>
                for humans.
              </h1>
              <div className={headerBlock('bottom')}>
                <LocationInfoGroup
                  primary="Amsterdam"
                  secondary="letsmake@kingstreetapps.com"
                  timezone="Europe/Amsterdam"
                  className={headerBlock('location-info-group')}
                />
                <LocationInfoGroup
                  primary="London"
                  secondary="letsmake@kingstreetapps.com"
                  timezone="Europe/London"
                  className={headerBlock('location-info-group')}
                />
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Header>
    );
  }

  renderProjectCarouselSection() {
    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 10000,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const reversedProjects = reverse(slice(this.props.projects));
    return (
      <Section className={projectsBlock()}>
        <Slider {...settings} modifier="project">
          {map(reversedProjects, (project, index) => (
            <Project key={index} project={project} />
          ))}
        </Slider>
      </Section>
    );
  }

  renderStrategySection() {
    return (
      <Fade delay={200}>
        <Section className={strategyBlock()}>
          <div className={strategyBlock('content')}>
            <h2 className={strategyBlock('copy')}>
              We apply a process that fixes the problem rather than following a rigid plan which treats every challenge the same.
            </h2>
            {/* <Link href="#">See how</Link> */}
          </div>
        </Section>
      </Fade>
    );
  }
}

const mapStateToProps = (state) => {
  return { projects: state.projects };
};

export default connect(mapStateToProps)(HomeContainer);
