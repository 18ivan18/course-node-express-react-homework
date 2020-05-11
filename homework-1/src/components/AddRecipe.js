import React, { useState } from 'react'
import { connect } from 'react-redux';
import { addNewRecipe, editRecipe } from '../features/recepies/RecepiesSlice'
import ImageUploader from './ImageUploader';


const AddRecipe = ({ auth, submitNewRecipe, editRecipe, adding, recipe }) => {
    const [formData, setFormData] = useState({
    name: adding ? '' : recipe.name,
    description: adding ? '' : recipe.description,
    preparationTime: adding ? '' : recipe.preparationTime,
    products: adding ? '' : recipe.products.join(','),
    detailedDescription: adding ? '' : recipe.detailedDescription,  
    pictureUrl: adding ? '' : recipe.pictureUrl,
    tags: adding ? '' : recipe.tags.join(','),
    checked: false,
    URI: false
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === "description" && value.length > 256)return;
        if(name === "detailedDescription" && value.length > 2048) return;
        if(name === "preparationTime" && !e.target.validity.valid) return;
        if(name === "name" && value.length > 80) return;
        setFormData({...formData, [name]: value });
    }

    const editExistingRecipe = () => {
            editRecipe({
            recipeID: recipe.recipeID,
            userID: auth.user.userID,
            author: recipe.author,
            name: formData.name,
            description: formData.description,
            detailedDescription: formData.detailedDescription,
            tags: formData.tags.split(',').map((product) => product.trim()),
            products: formData.products.split(',').map((product) => product.trim()),
            preparationTime: formData.preparationTime,
            pictureOfTheMeal: formData.checked ? recipe.pictureOfTheMeal : formData.pictureUrl,
            postTime: recipe.postTime,
            lastModificationDate: Date.now()
        });
    }


    const addNewRecipe = () => {
        submitNewRecipe({
            recipeID: Date.now(),
            userID: auth.user.userID,
            author: auth.user.name,
            name: formData.name,
            description: formData.description,
            detailedDescription: formData.detailedDescription,
            tags: formData.tags.split(',').map((product) => product.trim()),
            products: formData.products.split(',').map((product) => product.trim()),
            preparationTime: formData.preparationTime,
            pictureOfTheMeal: formData.pictureUrl,
            postTime: Date.now(),
            lastModificationDate: Date.now()
        });
        setFormData({
            name: '',
            description: '',
            preparationTime: '',
            products: '',
            detailedDescription: '',  
            pictureUrl: '',
            tags: ''
            })
    }


    const handleInputFileChange = (e) => {
        setFormData({...formData, pictureUrl: URL.createObjectURL(e.target.files[0])})
    }

    return ( 
        <div className="container">
            <h1>{adding ? "Adding new recipe" : "Editing recipe"}</h1>

            <div className="row">
            <form className="col s12">
            {/*NAME*/}
                <div className="row">
                <div className="input-field col s6">
                    <i className="material-icons prefix">account_circle</i>
                    <input id="name" name="name" type="text" placeholder="Placeholder" onChange={handleChange} value={formData.name}/>
                    <label htmlFor="name">Name</label>
                    <div style={{fontSize: '13px'}} className={formData.name.length < 80 ? "blue-text small right-align" : "red-text small right-align"}>
                        {formData.name.length}/80</div>
                </div>
                <div className="input-field col s6">
                    <textarea className="materialize-textarea" id="description" name="description" type="text" onChange={handleChange} value={formData.description}/>
                    <label htmlFor="description">Description</label>
                    <div style={{fontSize: '13px'}} className={formData.description.length < 256 ? "blue-text small right-align" : "red-text small right-align"}>
                        {formData.description.length}/256</div>
                </div>
            </div>
            
            {/*PROFILEPICTURE*/}
            <label>Picture of the meal</label>
            {!adding &&
            <label style={{margin: "500px"}}>
                <input type="checkbox" onChange={() => setFormData({...formData, checked: !formData.checked})} checked={formData.checked}/>
                <span>Use the same picture</span>
            </label>}
            <label style={{margin: "500px"}}>
                <input type="checkbox" onChange={() => setFormData({...formData, URI: !formData.URI})} checked={formData.URI}/>
                <span>Use URI</span>
            </label>
            {adding && !formData.URI && 
                <ImageUploader handleChange={handleInputFileChange}></ImageUploader>
            }
            {!formData.checked && formData.URI &&
                    <div className="row">
                        <div className="input-field col s12">
                            <input name="pictureUrl" id="pictureUrl" placeholder="Picture URI" onChange={handleChange} value={formData.pictureUrl}/>
                        </div>
                    </div>}

            {!adding && !formData.checked && <ImageUploader handleChange={handleInputFileChange}></ImageUploader>}
            {/*DESCRIPTION*/}
            <div className="row" style={{margin: "30px 0px 0px 0px"}}>
                <div className="input-field col s12">

                <i className="material-icons prefix">edit   </i>
                    <textarea id="detailedDescription" name="detailedDescription" palceholder="Detailed description" className="materialize-textarea" onChange={handleChange} value={formData.detailedDescription}></textarea>
                    <label htmlFor="detailedDescription">Detailed description</label>   
                    <div style={{fontSize: '13px'}} className={formData.detailedDescription.length < 2048 ? "blue-text small right-align" : "red-text small right-align"}>
                        {formData.detailedDescription.length}/2048</div>
                </div>
            </div> 
            
            {/*TAGS*/}
            <div className="row">
                <div className="input-field col s12">
                <i className="material-icons prefix">flag   </i>
                    <textarea id="tags" name="tags" className="materialize-textarea" palceholder="Tags" onChange={handleChange} value={formData.tags}></textarea>
                    <label htmlFor="tags">Tags</label>  
                </div>
            </div> 

            {/*PRODUCTS*/}
            <div className="row">
                <div className="input-field col s12">
                <i className="material-icons prefix">restaurant</i>
                    <textarea id="products" name="products" className="materialize-textarea" palceholder="Products" onChange={handleChange} value={formData.products}></textarea>
                    <label htmlFor="products">Products</label>  
                </div>
            </div> 


            {/*TIME*/}
            <div className="input-field col s6">
                <input type="text" pattern="[0-9]*"
                 onChange={handleChange} value={formData.preparationTime} palceholder="Time for cooking" name="preparationTime"/>
                <label htmlFor="preparationTime">Preparation Time</label>
            </div>


            </form>
            <button className="btn waves-effect waves-light modal-close" name="new" onClick={adding ? addNewRecipe : editExistingRecipe}>Submit new recipe
                <i className="material-icons right">send</i>
            </button>
        </div>
        </div>
    )
}
const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = (dispatch) => {
    return {
        submitNewRecipe: (newRecipe) => dispatch(addNewRecipe(newRecipe)),
        editRecipe: (editedRecipe) => dispatch(editRecipe(editedRecipe))
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddRecipe);