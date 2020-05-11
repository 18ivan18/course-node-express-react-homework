/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Recipe from './Recipe'
import Chip from '@material-ui/core/Chip'   
import AddRecipe from '../components/AddRecipe'
import {adminMode} from '../features/users/AuthSlice'

const Recepies = ({ recipes, auth, setAdminMode }) => {
    const [authors, setAuthors] = useState(["admin"])
    const [tags, setTags] = useState(["miso", "meso"])

    useEffect(() => {
        // console.log("Component did mount...")
        const M = window.M;
        
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {});

    }, []);
    const getFilteredRecipes = () => {
        let top10 = recipes.filter(recipe => (recipe.tags.some(t => tags.indexOf(t) >= 0)) || 
        authors.includes(recipe.author))
        top10.sort((a, b) => {
            if (a.postTime > b.postTime) {
                return -1;
            }
            if (b.postTime > a.postTime) {
                return 1;
            }
            return 0;
        });
        return top10.slice(0, 10);
    }

    const removeTag = (t) => {
        setTags(tags.filter((tag) => tag !== t))
    }
    const removeAuthor = (a) => {
        setAuthors(authors.filter((author) => author !== a))
    }

    const [formData, setFormData] = useState({
        tag: '',
        author: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value });
    }
    const addNewAuthor = (a) => {
        setAuthors([...authors, a])
        setFormData({...formData, author: ''})
    }
    const addNewTag = (t) => {
        setTags([...tags, t])
        setFormData({...formData, tag: ''})
    }


    return (
        <div style={{fontFamily: "Bernard MT Condensed"}}>
            <center>
                <div className="z-depth-1 grey lighten-4 row" style={{width:"70%", opacity:"0.95", display: 'inline-block', padding: '32px 48px 0px 48px', border: '1px solid #EEE'}}>
                    
                <h1 className="center-align">Recepies</h1>
                <div>
                    <button data-target="modal2" className="btn orange pulse modal-trigger" style={{margin: "0px 40px 40px 40px"}}>Publish new recipe</button>
                    {auth.user.role === "admin" && <button style={{margin: "0px 40px 40px 40px"}} className="btn red pulse round" onClick={() => setAdminMode()}>Admin Mode</button>}
                </div>
            

                    <div className="row">
                        <div className="col s7">
                            <div>
                                {tags.map((t) => <Chip onDelete={() => removeTag(t)} key={t} label={t}></Chip>)}
                            </div>
                        <div>
                            <input placeholder="Search by tags" type='tags' name='tag' id='tags' onChange={handleChange} value={formData.tag}/>
                            <div>
                                <button className="btn blue btn-flat" onClick={() => addNewTag(formData.tag)}>Add tag</button>
                            </div>
                        </div>  
                    </div>
                


                    <div className="col s3">
                            <div>
                                {authors.map((a) => <Chip onDelete={() => removeAuthor(a)} key={a} label={a}></Chip>)}
                            </div>
                            <div>
                                <input placeholder="Search by author" type='tags' name='author' id='tags' onChange={handleChange} value={formData.author}/>
                                <div>
                                    <button className="btn blue btn-flat" onClick={() => addNewAuthor(formData.author)}>Add author</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </center>


            {/* <!-- Modal Structure --> */}
            <div id="modal2" className="modal">
                <div className="modal-content">
                    <AddRecipe adding={true}></AddRecipe>
                </div>
                <div className="modal-footer">
                    <a className="modal-close waves-effect waves-green btn-flat">Done</a>
                </div>
            </div>

            <div className="section">
                <div className="row">
                    {!auth.adminMode ? (getFilteredRecipes().map((recipe) => <Recipe recipe={recipe} key={recipe.recipeID}/>)) :
                     (recipes.map((recipe) => <Recipe recipe={recipe} key={recipe.recipeID}/>))}
                 </div>
            </div>
                
        </div>
    )
}

const mapStateToProps = (state) => ({
    recipes: state.recipes,
    auth: state.auth
})

const mapDispatchToProps = (dispatch) => {
    return {
        setAdminMode: () => dispatch(adminMode())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Recepies)
