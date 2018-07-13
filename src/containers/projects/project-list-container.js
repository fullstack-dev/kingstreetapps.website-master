import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import createBemClass from 'react-bem-builder';
import { map, reverse, slice } from 'lodash';
import { Header, Section, Masonry, Project } from '../../components';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { cssTransitionClasses } from '../../transitions/utilities/transition-utility';

const projectMasonryCn = createBemClass('project-list-project-masonry');

class ProjectListContainer extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <TransitionGroup component={null}>
          <CSSTransition
            key={'project-list-page-content'}
            classNames={cssTransitionClasses('project-list-page-content')}
            appear={true}
            timeout={350}>
            <div>
              {this.renderProjectMasonrySection()}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }

  renderProjectMasonrySection() {
    const options = {
      columnWidth: '.' + projectMasonryCn('sizer'),
      gutter: '.' + projectMasonryCn('gutter-sizer'),
      itemSelector: '.' + projectMasonryCn('item'),
      percentPosition: true
    };
    const reversedProjects = reverse(slice(this.props.projects));
    return (
      <Section>
        <Masonry options={options}>
          {map(reversedProjects, (project, index) => (
            <Project key={index} project={project} className={projectMasonryCn('item')} />
          ))}
          <div className={projectMasonryCn('sizer')}></div>
          <div className={projectMasonryCn('gutter-sizer')}></div>
        </Masonry>
      </Section>
    )
  }
}

const mapStateToProps = (state) => {
  return { projects: state.projects };
};

export default connect(mapStateToProps)(ProjectListContainer);
