/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { connect } from 'react-redux'
import { removeUser } from "../features/users/UsersSlice"
import { useHistory } from 'react-router-dom'

export const ManageUsers = ({ users, removeUser }) => {
    const history = useHistory();
    const editUser = (userID) => {
        history.push(`/editUser/${userID}`)
    }
    return (
        <div>
            <center>
                <h1>Manage Users</h1>
            </center>
            {users.map(user => (
                  <div class="card horizontal" style={{opacity:"0.95"}} key={user.userID}>
                    <div class="card-image waves-effect waves-block waves-light">
                        <img className="activator" style={{width:"400px", height:"400px"}} src={user.profilePicture}/>
                    </div>

                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">{user.name}</span>
                        <p>{user.description}</p>
                        <div style={{ position: "absolute",
                                        bottom: "15%",
                                        right: "1%"}}>
                            <button className="btn green lighten-1" onClick={() => editUser(user.userID)}>Edit<i class="material-icons right">edit</i></button>
                            <button className="btn red darken-2" onClick={() => removeUser(user.userID)}>Delete  <i class="material-icons right">delete</i></button>
                        </div>
                    </div>

                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">Full sepcification of the user:<i class="material-icons right">close</i></span>
                        <ul>
                        <li><p>{`UID: ${user.userID}`}</p></li>
                        <li><p>{`Name: ${user.name}`}</p></li>
                        <li><p>{`Email: ${user.email}`}</p></li>
                        <li><p>{`Gender: ${user.gender}`}</p></li>
                        <li><p>{`Role: ${user.role}`}</p></li>
                        <li><p>{`Account validity: ${user.accountValidity}`}</p></li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => ({
    users: state.users
})

const mapDispatchToProps = (dispatch) => {
    return {
        removeUser: (userID) => dispatch(removeUser(userID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers)
