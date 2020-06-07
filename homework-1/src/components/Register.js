import React, { useState, useEffect } from "react";
// import { selectError } from "../features/users/UsersSlice";
import { useHistory } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";

import "../css/Register.css";
import ImageUploader from "./ImageUploader";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    description: "",
    profilePictureUrl: "",
    gender: "",
  });

  let history = useHistory();

  const [registerState, setRegisterState] = useState({
    success: false,
    message: "",
  });

  const registerUser = async (user) => {
    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const u = await response.json();
      setRegisterState({ success: u.success, message: u.message });
    } catch (error) {
        setRegisterState({ success: false, message: error });
    }
  };

  const handleSubmit = () => {
    let user = {
      email: formData.email,
      name: formData.firstName + " " + formData.lastName,
      password: formData.password,
      shortDescription: formData.description,
      role: "user",
      gender: formData.gender,
      profilePicture: formData.profilePictureUrl,
      validity: "active",
    };
    registerUser(user);
    
  };

  useEffect(() => {
    if (registerState.success) {
        history.push("/");
      }
  }, [registerState.success])
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description" && value.length > 512) return;
    setFormData({ ...formData, [name]: value });
  };
  const handleDropdownChange = (e) => {
    setFormData({ ...formData, gender: e.value });
  };
  const handleInputFileChange = (e) => {
    setFormData({
      ...formData,
      profilePictureUrl: URL.createObjectURL(e.target.files[0]),
    });
  };

  return (
    <center>
      <div
        className="z-depth-1 grey lighten-4 row"
        style={{
          display: "inline-block",
          padding: "32px 48px 0px 48px",
          border: "1px solid #EEE",
        }}
      >
        <div className="row">
          <form className="col s12">
            {/*NAME*/}
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">account_circle</i>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="validate"
                  onChange={handleChange}
                  value={formData.firstName}
                />
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="input-field col s6">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="validate"
                  onChange={handleChange}
                  value={formData.lastName}
                />
                <label htmlFor="lastName">Last Name</label>
              </div>
            </div>

            {/*GENDER*/}
            <div style={{ width: "300px" }}>
              <Select
                autosize={true}
                options={[
                  { value: "M", label: "Male" },
                  { value: "F", label: "Female" },
                ]}
                onChange={handleDropdownChange}
                autoFocus={true}
                placeholder="Gender"
              />
            </div>

            {/*EMAIL*/}
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="validate"
                  onChange={handleChange}
                  value={formData.email}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            {/*PASSWORD*/}
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">lock_outline</i>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="validate"
                  onChange={handleChange}
                  value={formData.password}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>

            {/*PROFILEPICTURE*/}
            <label>Profile picture</label>
            <label style={{ margin: "200px" }}>
              <input
                type="checkbox"
                onChange={() =>
                  setFormData({ ...formData, URI: !formData.URI })
                }
                checked={formData.URI}
              />
              <span>Use URI</span>
            </label>
            {!formData.URI && (
              <ImageUploader
                handleChange={handleInputFileChange}
              ></ImageUploader>
            )}
            {formData.URI && (
              <div className="row">
                <div className="input-field col s12">
                  <input
                    name="profilePictureUrl"
                    id="profilePictureUrl"
                    placeholder="Picture URI"
                    onChange={handleChange}
                    value={formData.profilePictureUrl}
                  />
                </div>
              </div>
            )}

            {/*DESCRIPTION*/}
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">edit </i>
                <textarea
                  id="description"
                  name="description"
                  className="materialize-textarea"
                  onChange={handleChange}
                  value={formData.description}
                ></textarea>
                <label htmlFor="description">Description</label>
                <div
                  style={{ fontSize: "13px" }}
                  className={
                    formData.description.length < 512
                      ? "blue-text small right-align"
                      : "red-text small right-align"
                  }
                >
                  {formData.description.length}/512
                </div>
              </div>
            </div>
          </form>
          {registerState.message && (
            <div class={registerState.success ? "green-text" : "red-text"}>
              {" "}
              {registerState.message}
            </div>
          )}
          <button
            class="btn waves-effect waves-light"
            name="Register"
            onClick={handleSubmit}
          >
            Register
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </center>
  );
};

export default Register;
