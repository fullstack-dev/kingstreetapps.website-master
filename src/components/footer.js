import React from 'react';
import { Link } from 'react-router-dom';
import { withBem } from '../hocs';
import { Grid, Row, Col } from './layout';
import footerLogoImg from 'assets/images/footer-logo.svg';

const Footer = ({ cn }) => (
  <footer className={cn()}>
    <Grid>
      <Row>
        <Col sm={6} className={cn('col')}>
          <div className={cn('address-info-wrapper')}>
            <div className={cn('logo')}>
              <img src={footerLogoImg} title="King Street Apps Logo" />
            </div>
            <span>
              16-16A Baldwin's Gardens,<br/>
              Hatton Garden,<br/>
              London, EC1N 7RJ<br/>
            </span>
          </div>
        </Col>
        <Col sm={6} lg={3} className={cn('col')}>
          <span>
            <a href="mailto:hello@kingstreetapps.com">hello@kingstreetapps.com</a><br/>
            <a href="tel:+447547152093">+44 7547 152093</a><br/>
            @kingstreetapps
          </span>
        </Col>
        <Col sm={6} lg={3} className={cn('col')}>
          <span>© 2018 King Street Apps Ltd</span>
        </Col>
      </Row>
    </Grid>
  </footer>
);

export default withBem('footer')(Footer);
