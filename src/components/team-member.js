import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withBem } from '../hocs';
import LinkWithArrow from './link-with-arrow';
import linkedinLogo from 'assets/images/linkedin-logo@2x.png';

const getExperienceContent = ({ teamMember, cn }) => {
  const { linkedin_url } = teamMember;
  return linkedin_url ? (
    <div className={cn('inline-field', [ 'experience' ])}>
      <span>Experience</span>
      <span>
        <LinkWithArrow
          href={linkedin_url}
          target="_blank"
          className={cn('linkedin-link')}>
          <img src={linkedinLogo} />
          <span>Linkedin</span>
        </LinkWithArrow>
      </span>
    </div>
  ) : null;
};

const TeamMember = ({ teamMember, cn, className, ...rest }) => (
  <div {...rest} className={classnames(cn(), className)}>
    <img
      src={teamMember['photo_url']}
      title={teamMember.title}
      className={cn('photo')}
    />
    <div className={cn('name-label')}>Name</div>
    <div className={cn('name')}>{teamMember.title}</div>
    <p className={cn('description')}>{teamMember.description}</p>
    <div className={cn('inline-fields')}>
      <div className={cn('inline-field', [ 'role' ])}>
        <span>Role</span>
        <span>{teamMember.role}</span>
      </div>
      {getExperienceContent({ teamMember, cn })}
    </div>
  </div>
);

TeamMember.propTypes = {
  teamMember: PropTypes.object.isRequired,
};

export default withBem('team-member')(TeamMember);
