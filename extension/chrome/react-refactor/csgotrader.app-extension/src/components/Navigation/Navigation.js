import React, { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import links from "./links.js";
import logo from "assets/images/cstlogo48.png";
import "./Navigation.css";
import NewTabLink from 'components/NewTabLink/NewTabLink';

const navigation = () => {
  return (
    <Fragment>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="https://csgotrader.app">
          <img
            src={logo}
            className="d-inline-block navlogo"
            alt="CSGO Trader Extension logo"
          />
          CSGO Trader Extension
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {links.map(link => {
              return !link.isExternal
                  ? (<RouterNavLink to={link.path} exact={false} activeClassName="active" key={link.id}>{link.title}</RouterNavLink>)
                  : (<NewTabLink to={link.path} className='nav-link' key={link.id}> {link.title} </NewTabLink>);
            })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

// workaround from here: https://github.com/react-bootstrap/react-linkr-bootstrap/issues/242#issuecomment-480330910
const RouterNavLink = ({ children, ...props }) => (
  <LinkContainer {...props}>
    <Nav.Link active={false}>{children}</Nav.Link>
  </LinkContainer>
);

export default navigation;
