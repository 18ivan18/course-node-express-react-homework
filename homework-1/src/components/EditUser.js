import React, { useState } from 'react'
import { connect } from 'react-redux'
import  { useParams, useHistory } from "react-router-dom";
import { editUser } from "../features/users/UsersSlice"
import Select from 'react-select'
import ImageUploader from './ImageUploader';

export const EditUser = ({ users, editUser }) => { 
    const { userID } = useParams();

    const user = users.filter(u => u.userID === parseInt(userID))[0];
    console.log(users, user, userID);

    const [formData, setFormData] = useState({
        email: user.email,
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ")[1],
        description: user.description,  
        profilePictureUrl: user.profilePicture,
        gender: user.genderm,
        role: user.role,
        accountValidity: user.accountValidity
    })

    let history = useHistory();
    
    const handleSubmit = () => {
        editUser({
            userID: user.userID,
            email: formData.email,
            name: formData.firstName + " " + formData.lastName,
            password: user.password,
            description: formData.description,
            role: formData.role,
            gender: formData.gender,
            profilePicture: formData.profilePictureUrl,
            accountValidity: formData.accountValidity,
            registrationDate: user.registrationDate,
            lastModificationDate: Date.now()
        });
        history.push('/');
    }  
    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === "description" && value.length > 512)return;
        setFormData({...formData, [name]: value });
    }
    const handleDropdownChange = (e) => {
        console.log(e)
        setFormData({...formData, [e.index]: e.value });
    }
    const handleInputFileChange = (e) => {
        setFormData({...formData, profilePictureUrl: URL.createObjectURL(e.target.files[0])})
    }
    return (
        <div>
            <center>
            <div className="z-depth-1 grey lighten-4 row" style={{display: 'inline-block', padding: '32px 48px 0px 48px', border: '1px solid #EEE'}}>
                <h1 style={{fontFamily: "Monospace"}}>Editing user with UID: {userID}</h1>
                <div className="row">
                    <form className="col s12">
                    {/*NAME*/}
                        <div className="row">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="firstName" name="firstName" type="text" className="validate" onChange={handleChange} value={formData.firstName}/>
                            <label htmlFor="firstName">First Name</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="lastName" name="lastName" type="text" className="validate" onChange={handleChange} value={formData.lastName}/>
                            <label htmlFor="lastName">Last Name</label>
                        </div>
                    </div>

                    {/*GENDER*/}
                    <div>
                        <Select options={[
                            { value: 'M', label: 'Male', index: "gender" },
                            { value: 'F', label: 'Female', index: "gender" }
                        ]} onChange={handleDropdownChange} placeholder="Gender"/>
                    </div>

                     {/*GENDER*/}
                     <div>
                        <Select options={[
                            { value: 'user', label: 'User', index: "role" },
                            { value: 'admin', label: 'Admin', index: "role" }
                        ]} onChange={handleDropdownChange} placeholder="Role"/>
                    </div>

                     {/*VALIDITY*/}
                     <div>
                        <Select options={[
                            { value: 'active', label: 'Active', index: "accountValidity" },
                            { value: 'suspended', label: 'Suspended', index: "accountValidity" },
                            { value: 'deactivated', label: 'Deactivated', index: "accountValidity" }
                        ]} onChange={handleDropdownChange} placeholder="Validity"/>
                    </div>

                    {/*EMAIL*/}
                    <div className="row">
                        <div className="input-field col s12">
                        <i className="material-icons prefix">email</i>
                        <input id="email" name="email" type="email" className="validate" onChange={handleChange} value={formData.email}/>
                        <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    
                    {/*PROFILEPICTURE*/}
                    <label>Profile picture</label>
                    <ImageUploader handleChange={handleInputFileChange}></ImageUploader>

                    {/*DESCRIPTION*/}
                    <div className="row">
                        <div className="input-field col s12">

                        <i className="material-icons prefix">edit   </i>
                            <textarea id="description" name="description" className="materialize-textarea" onChange={handleChange} value={formData.description}></textarea>
                            <label htmlFor="description">Textarea</label>   
                            <div style={{fontSize: '13px'}} className={formData.description.length < 512 ? "blue-text small right-align" : "red-text small right-align"}>
                                {formData.description.length}/512</div>
                        </div>
                    </div>  
                    </form>
                    <button class="btn waves-effect waves-light" onClick={handleSubmit}>Edit
                        <i class="material-icons right">send</i>
                    </button>
                </div>
            </div>
        </center>
        </div>
    )
}

const mapStateToProps = (state) => ({
    users: state.users
})

const mapDispatchToProps = dispatch => {
    return {
        editUser: (userID) => dispatch(editUser(userID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)
