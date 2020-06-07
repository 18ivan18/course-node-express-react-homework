/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { connect } from "react-redux";
import { removeUser } from "../features/users/UsersSlice";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

export const ManageUsers = () => {
  const history = useHistory();
  const editUser = (_id) => {
    history.push(`/editUser/${_id}`);
  };

  const getUsers = async () => {
    try {
      const result = await fetch("http://localhost:8080/api/users", {
        method: "GET",
      });
      const users = await result.json();
      console.log(users);
      if (users.success) {
        setUsers(users.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: "DELETE",
      });
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const [users, setUsers] = useState([]);
  return (
    <div>
      <center>
        <h1>Manage Users</h1>
      </center>
      {users.map((user) => (
        <div
          class="card horizontal"
          style={{ opacity: "0.95" }}
          key={user._id}
        >
          <div class="card-image waves-effect waves-block waves-light">
            <img
              className="activator"
              style={{ width: "400px", height: "400px" }}
              src={user.profilePicture}
            />
          </div>

          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">
              {user.name}
            </span>
            <p>{user.shortDescription}</p>
            <div style={{ position: "absolute", bottom: "15%", right: "1%" }}>
              <button
                className="btn green lighten-1"
                onClick={() => editUser(user._id)}
              >
                Edit<i class="material-icons right">edit</i>
              </button>
              <button
                className="btn red darken-2"
                onClick={() => deleteUser(user._id)}
              >
                Delete <i class="material-icons right">delete</i>
              </button>
            </div>
          </div>

          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">
              Full sepcification of the user:
              <i class="material-icons right">close</i>
            </span>
            <ul>
              <li>
                <p>{`UID: ${user._id}`}</p>
              </li>
              <li>
                <p>{`Name: ${user.name}`}</p>
              </li>
              <li>
                <p>{`Email: ${user.email}`}</p>
              </li>
              <li>
                <p>{`Gender: ${user.gender}`}</p>   
              </li>
              <li>
                <p>{`Role: ${user.role}`}</p>
              </li>
              <li>
                <p>{`Account validity: ${user.validity}`}</p>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => {
  return {
    removeUser: (userID) => dispatch(removeUser(userID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
