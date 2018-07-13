import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { map } from 'lodash';
import { withBem } from '../hocs';
import LinkWithArrow from './link-with-arrow';
import Fade from 'react-reveal/Fade';

const Project = ({ project, cn, className, ...rest }) => (
  <div {...rest} className={classnames(cn(), className)}>
    <Fade delay={200}>
      <div className={cn('info')}>
        <h3 className={cn('title')}>{project.title}</h3>
        <div className={cn('inline-fields')}>
          <div className={cn('inline-field')}>
            <span>Platform</span>
            <span>{map(project.platforms, 'name').join(', ')}</span>
          </div>
          <div className={cn('inline-field')}>
            <span>Year</span>
            <span>{project.year}</span>
          </div>
        </div>
        <div className={cn('introduction')}>
          {project.introduction}
        </div>
        {/*<LinkWithArrow to={'/our-work/' + project.id} className={cn('link')}>View project</LinkWithArrow>*/}
      </div>
      <div className={cn('image-wrapper')}>
        <img
          className={cn('image')}
          src={project['hero_images'][0]['url']}
          title={project['hero_images'][0]['name']}
        />
      </div>
    </Fade>
  </div>
);

Project.propTypes = {
  project: PropTypes.object.isRequired,
};

export default withBem('project')(Project);
