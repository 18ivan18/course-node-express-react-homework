/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../features/users/AuthSlice"
import Logo from "../assets/logo.png";

const Login = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    submitted: false,
    successful: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async (email, password, cb) => {
    try {
      const signin = await fetch("http://localhost:8080/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const result = await signin.json();
      dispatch(setAuth({loggedIn: result.success, user: result.user}))
      if(result.success) {
        cb();
      }
    } catch (error) {
      console.log(error);
    }
  };

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;
    setFormData({ ...formData, submitted: true });
    if (email && password) {
      const cb = () => history.replace(from);
      login(email, password, cb);
      setFormData({ ...formData, password: "", successful: false });
    }
  };

  const { email, password, submitted, successful } = formData;
  return (
    <div>
      <center>
        <img
          className="responsive-img"
          style={{
            width: "25%",
            height: "25%",
            position: "relative",
            top: "-120px",
          }}
          src={Logo}
        />

        <div style={{ top: "-230px", position: "relative" }}>
          <h5 className="indigo-text">Please, login into your account</h5>
          <div className="section"></div>

          <div className="container">
            {!successful && (
              <div style={{ fontSize: "13px" }} className="red-text small">
                The username and password you entered did not match our records.
                Please double-check and try again.
              </div>
            )}
            <div
              className="z-depth-1 grey lighten-4 row"
              style={{
                display: "inline-block",
                padding: "32px 48px 0px 48px",
                border: "1px solid #EEE",
              }}
            >
              <div className="row">
                <div className="col s12"></div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input
                    className="validate"
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={formData.email}
                  />
                  <label htmlFor="email">Enter your email</label>
                  {submitted && !email && (
                    <div
                      style={{ fontSize: "12px" }}
                      className="red-text small left-align"
                    >
                      Email is required
                    </div>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input
                    className="validate"
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                  <label htmlFor="password">Enter your password</label>
                  {submitted && !password && (
                    <div
                      style={{ fontSize: "12px" }}
                      className="red-text small left-align"
                    >
                      Password is required
                    </div>
                  )}
                </div>
                <label style={{ float: "right" }}>
                  <Link className="pink-text">
                    <b>Forgot Password?</b>
                  </Link>
                </label>
              </div>

              <br />
              <center>
                <div className="row">
                  <button
                    name="btn_login"
                    onClick={handleSubmit}
                    className="col s12 btn btn-large waves-effect indigo"
                  >
                    Login
                  </button>
                </div>
              </center>
            </div>
          </div>
          <Link to="/register">Create account</Link>
        </div>
      </center>
    </div>
  );
};

export default Login;
