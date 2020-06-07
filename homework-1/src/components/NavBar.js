/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../features/users/AuthSlice";
import Logo from "../assets/logo.png";

const NavBar = ({ auth, logout }) => {
  useEffect(() => {
    // console.log("Component did mount...")
    const M = window.M;

    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, {});
  }, []);

  return (
    <React.Fragment>
      <div className="navbar">
        <nav role="navigation" className="orange">
          <div className="nav-wrapper">
            <Link to="/" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </Link>
            <Link to="/" className="brand-logo">
              <img
                style={{
                  width: "130px",
                  height: "130px",
                  position: "relative",
                  top: "-33px",
                  left: "-20px",
                }}
                src={Logo}
              />
            </Link>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/">Home</Link>
              </li>
              {!auth.loggedIn && (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/recepies">Recepies</Link>
              </li>
              {auth.loggedIn && (
                <li>
                  <Link to="/manageUsers">Manage Users</Link> }
                </li>
              )}
              {auth.loggedIn && (
                <li>
                  <Link onClick={() => logout()}>
                    Logout
                    <i className="material-icons right small">exit_to_app</i>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/recepies">Recepies</Link>
        </li>
      </ul>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
