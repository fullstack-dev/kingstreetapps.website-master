import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import createBemClass from 'react-bem-builder';
import { Link } from 'react-router';
import { map, find, reverse, slice } from 'lodash';
import { Header, Section, Slider } from '../../components';
import { Row, Col } from '../../components/layout';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { cssTransitionClasses } from '../../transitions/utilities/transition-utility';

const headerCn = createBemClass('project-detail-header');
const projectContentSectionCn = createBemClass('project-detail-section-project-content');
const projectNavigationSectionCn = createBemClass('project-detail-section-project-navigation');

class ProjectDetailContainer extends Component {
  constructor(props) {
    super(props);

    if (!props.project) {
      props.router.push('/our-work');
    }
  }

  render() {
    if (!this.props.project) {
      return null;
    }

    return (
      <Fragment>
        {this.renderHeader()}
        <TransitionGroup component={null}>
          <CSSTransition
            key={'project-detail-page-content'}
            classNames={cssTransitionClasses('project-detail-page-content')}
            appear={true}
            timeout={350}>
            <div>
            {this.renderProjectContentSection()}
            {this.renderProjectNavigationSection()}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }

  renderHeader() {
    const { project } = this.props;
    const style = {
      background: `linear-gradient(112deg, ${project['theme_colours'].dark}, ${project['theme_colours'].light})`
    };
    return (
      <Header className={headerCn()} dark noTopSpacing style={style}>
        <div className={headerCn('content')}>
          <div className={headerCn('title-wrapper')}>
            <div className={headerCn('project-label')}>
              Project
            </div>
            <h2 className={headerCn('project-title')}>
              {project.title}
            </h2>
          </div>
          <div className={headerCn('image-wrapper')}>
            <img src={project['featured_image']['url']} title={project['featured_image']['name']} />
          </div>
        </div>
      </Header>
    );
  }

  renderProjectContentSection() {
    const { project } = this.props;
    const sliderOptions = {
      dots: true,
      arrows: true,
      infinite: true,
      autoplay: true,
      speed: 300,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <Section className={projectContentSectionCn()}>
        <div className={projectContentSectionCn('inner')}>
          <div className={projectContentSectionCn('intro-container')}>
            <Row>
              <Col sm={12} lg={6}>
                <div className={projectContentSectionCn('intro-title')}>
                  <div className={projectContentSectionCn('intro-title-label')}>Intro title</div>
                  <h3>{project.introduction}</h3>
                </div>
              </Col>
              <Col sm={12} lg={6}>
                <div className={projectContentSectionCn('intro-fields')}>
                  <Row>
                    <Col sm={4}>
                      <div className={projectContentSectionCn('intro-field')}>
                        <span className={projectContentSectionCn('intro-field-label')}>
                          Services
                        </span>
                        <span className={projectContentSectionCn('intro-field-value')}>
                          {map(project.services, (service, index) => (
                            <span key={index}>{service.name}<br/></span>
                          ))}
                        </span>
                      </div>
                    </Col>
                    <Col sm={4}>
                      <div className={projectContentSectionCn('intro-field')}>
                        <span className={projectContentSectionCn('intro-field-label')}>
                          Platform
                        </span>
                        <span className={projectContentSectionCn('intro-field-value')}>
                          {map(project.platforms, (platform, index) => (
                            <span key={index}>{platform.name}<br/></span>
                          ))}
                        </span>
                      </div>
                    </Col>
                    <Col sm={4}>
                      <div className={projectContentSectionCn('intro-field')}>
                        <span className={projectContentSectionCn('intro-field-label')}>
                          Year
                        </span>
                        <span className={projectContentSectionCn('intro-field-value')}>
                          {project.year}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
          <div className={projectContentSectionCn('description-container')}>
            <Row>
              <Col sm={12} lg={6} className={projectContentSectionCn('description-col')}>
                <div dangerouslySetInnerHTML={{__html: project['description_1']}}></div>
              </Col>
              <Col sm={12} lg={6} className={projectContentSectionCn('description-col')}>
                <div dangerouslySetInnerHTML={{__html: project['description_2']}}></div>
              </Col>
            </Row>
          </div>
          <div className={projectContentSectionCn('slider-container')}>
            <Slider {...sliderOptions} modifier="project-image">
              {map(project.images, (image, index) => (
                <img key={index} src={image.url} title={image.name} />
              ))}
            </Slider>
          </div>
          <div className={projectContentSectionCn('meta-container')}>
            <Row>
              <Col sm={12} lg={6}>
                <div className={projectContentSectionCn('project-link-wrapper')}>
                  <a href={project.url} target="_blank" className={projectContentSectionCn('project-link')}>{project.url}</a>
                </div>
              </Col>
              <Col sm={12} lg={6}>
                <Row>
                  {map(project['meta_data'], (meta, index) => (
                    <Col key={index} sm={6}>
                      <div className={projectContentSectionCn('meta-field')}>
                        <span className={projectContentSectionCn('meta-field-label')}>
                          {meta.title}
                        </span>
                        <span className={projectContentSectionCn('meta-field-value')}>
                          {meta.value}
                        </span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </Section>
    );
  }

  renderProjectNavigationSection() {
    const { prevProject, nextProject } = this.props;
    return (
      <Section className={projectNavigationSectionCn()}>
        <Row>
          <Col sm={6}>
            {prevProject &&
              <div className={projectNavigationSectionCn('link-container')}>
                <span className={projectNavigationSectionCn('link-label')}>
                  Previous project
                </span>
                <Link to={'/our-work/' + prevProject.id} className={projectNavigationSectionCn('link')}>
                  {prevProject.title}
                </Link>
              </div>
            }
          </Col>
          <Col sm={6}>
            {nextProject &&
              <div className={projectNavigationSectionCn('link-container')}>
                <span className={projectNavigationSectionCn('link-label')}>
                  Next project
                </span>
                <Link to={'/our-work/' + nextProject.id} className={projectNavigationSectionCn('link')}>
                  {nextProject.title}
                </Link>
              </div>
            }
          </Col>
        </Row>
      </Section>
    );
  }
}

const mapStateToProps = (state, props) => {
  const projectId = props.params.projectId;
  const reversedProjects = reverse(slice(state.projects));
  const projectIds = map(reversedProjects, 'id');

  if (projectIds.indexOf(projectId) !== -1) {
    const currentIndex = projectIds.indexOf(projectId);
    return {
      project: reversedProjects[currentIndex],
      prevProject: reversedProjects[currentIndex - 1],
      nextProject: reversedProjects[currentIndex + 1]
    };
  } else {
    return null;
  }
};

export default connect(mapStateToProps)(ProjectDetailContainer);
