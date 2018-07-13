import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import createBemClass from 'react-bem-builder';
import { map } from 'lodash';
import { Header, Section, TeamMember } from '../components';
import Fade from 'react-reveal/Fade';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { cssTransitionClasses } from '../transitions/utilities/transition-utility';

const headerBlock = createBemClass('team-header');
const membersBlock = createBemClass('team-section-members');

class TeamContainer extends Component {
  render() {
    return (
      <Fragment>
        {this.renderHeader()}
        <TransitionGroup component={null}>
          <CSSTransition
            key={'team-page-content'}
            classNames={cssTransitionClasses('team-page-content')}
            appear={true}
            timeout={350}>
            <div>
              {this.renderMembersSection()}
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
            key={'team-header'}
            classNames={cssTransitionClasses(headerBlock('content'))}
            appear={true}
            timeout={350}>
            <div className={headerBlock('content')}>
              <h2 className={headerBlock('title')}>
                Our team
              </h2>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Header>
    );
  }

  renderMembersSection() {
    return (
      <Section className={membersBlock()}>
        <ul className={membersBlock('list')}>
          {map(this.props.team, (teamMember, index) => (
            <Fade delay={200}>
              <li key={index} className={membersBlock('list-item')}>
                <TeamMember teamMember={teamMember} />
              </li>
            </Fade>
          ))}
        </ul>
      </Section>
    )
  }
}

const mapStateToProps = (state) => {
  return { team: state.team };
};

export default connect(mapStateToProps)(TeamContainer);
