import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { removeRecipe } from '../features/recepies/RecepiesSlice'
import AddRecipe from './AddRecipe'

import '../css/Recipe.css'

const Recipe = ({ recipe, auth, remove }) => {
    useEffect(() => {
        // console.log("Component did mount...")
        const M = window.M;
        
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {});

    }, []);
    
    return (
                <div className="card-wrapper col s12 l6">
                        <div className="card">
                            <div className="card-image">    
                                <img alt="" className="responsive-img activator hoverable recipe-front-image" src={recipe.pictureOfTheMeal}/>
                                <span className="card-title activator black-text text-darken-4 name">{recipe.name}</span>
                            </div>
                            {auth.adminMode && 
                                <ul className="editButtons">
                                    <li className="right-align" style={{margin: '8px 8px'}}><button data-target="modal1" className="btn-floating green lighten-2 modal-trigger"><i className="material-icons">edit</i></button></li>
                                    <li className="right-align" style={{margin: '8px 8px'}}><button className="btn-floating red darken-3" onClick={() => remove(recipe.recipeID)}><i className="material-icons">delete_forever</i></button></li>
                                </ul>}
                            
                            <div className="card-content hoverable">
                                <p className="flow-text truncate">{recipe.description}</p>
                            </div>
                            <div className="card-reveal">
                                    <span className="card-title grey-text text-darken-4 name">{recipe.name}<i className="material-icons right">close</i></span>
                                    <p>{`Cook only for ${recipe.preparationTime} minutes`}</p>
                                    <p>Required products: {recipe.products.map(product => <span key={product }style={{margin: "0px 10px 0px 10px"}}>{product}</span>)}</p>
                                    <p className="flow-text">{recipe.detailedDescription}</p>
                                </div>
                        </div>{/* <!-- Modal Structure --> */}
                    <div id="modal1" className="modal">
                        <div className="modal-content">
                            <AddRecipe adding={false} recipe={recipe}></AddRecipe>
                        </div>
                        <div className="modal-footer">
                            <i className="modal-close waves-effect waves-green btn-flat">Done</i>
                        </div>
                    </div>
                    </div>

                    
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = (dispatch) => {
    return {
        remove: (recipeID) => dispatch(removeRecipe(recipeID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)
