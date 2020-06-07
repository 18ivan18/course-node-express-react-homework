import React, { useState } from "react";
import { connect } from "react-redux";
import ImageUploader from "./ImageUploader";

const AddRecipe = ({ auth, adding, recipe }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    preparationTime: "",
    products: "",
    detailedDescription: "",
    pictureUrl: "",
    tags: "",
    checked: false,
    URI: false,
  });

  const [recipeAddState, setRecipeAddState] = useState({
    success: false,
    message: "",
  });

  const editRecipe = async (rec) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${auth.user._id}/recipes/${recipe._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rec),
        }
      );
      const u = await response.json();
      setRecipeAddState({ success: u.success, message: u.message });
    } catch (error) {
      setRecipeAddState({ success: false, message: error });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description" && value.length > 256) return;
    if (name === "detailedDescription" && value.length > 2048) return;
    if (name === "preparationTime" && !e.target.validity.valid) return;
    if (name === "name" && value.length > 80) return;
    setFormData({ ...formData, [name]: value });
  };

  const editExistingRecipe = () => {
    editRecipe({
      name: formData.name,
      time: formData.preparationTime,
      picture: formData.pictureUrl,
      shortDescription: formData.description,
      detailedDescription: formData.detailedDescription,
      tags: formData.tags.split(",").map((product) => product.trim()),
      products: formData.products.split(",").map((product) => product.trim()),
    });
    setFormData({
      name: "",
      description: "",
      preparationTime: "",
      products: "",
      detailedDescription: "",
      pictureUrl: "",
      tags: "",
    });
  };

  const submitNewRecipe = async (recipe) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${auth.user._id}/recipes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipe),
        }
      );
      const u = await response.json();
      setRecipeAddState({ success: u.success, message: u.message });
    } catch (error) {
      setRecipeAddState({ success: false, message: error });
    }
  };

  const addNewRecipe = () => {
    submitNewRecipe({
      name: formData.name,
      time: formData.preparationTime,
      picture: formData.pictureUrl,
      shortDescription: formData.description,
      detailedDescription: formData.detailedDescription,
      tags: formData.tags.split(",").map((product) => product.trim()),
      products: formData.products.split(",").map((product) => product.trim()),
    });
    setFormData({
      name: "",
      description: "",
      preparationTime: "",
      products: "",
      detailedDescription: "",
      pictureUrl: "",
      tags: "",
    });
  };

  const handleInputFileChange = (e) => {
    setFormData({
      ...formData,
      pictureUrl: URL.createObjectURL(e.target.files[0]),
    });
  };

  return (
    <div className="container">
      <h1>{adding ? "Adding new recipe" : "Editing recipe"}</h1>

      <div className="row">
        <form className="col s12">
          {/*NAME*/}
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
              <input
                id="name"
                name="name"
                type="text"
                onChange={handleChange}
                value={formData.name}
              />
              <label htmlFor="name">Name</label>
              <div
                style={{ fontSize: "13px" }}
                className={
                  formData.name.length < 80
                    ? "blue-text small right-align"
                    : "red-text small right-align"
                }
              >
                {formData.name.length}/80
              </div>
            </div>
            <div className="input-field col s6">
              <textarea
                className="materialize-textarea"
                id="description"
                name="description"
                type="text"
                onChange={handleChange}
                value={formData.description}
              />
              <label htmlFor="description">Description</label>
              {/* <div style={{fontSize: '13px'}} className={formData.description.length < 256 ? "blue-text small right-align" : "red-text small right-align"}>
                        {formData.description.length}/256</div> */}
            </div>
          </div>

          {/*PROFILEPICTURE*/}
          <label>Picture of the meal</label>
          {!adding && (
            <label style={{ margin: "500px" }}>
              <input
                type="checkbox"
                onChange={() =>
                  setFormData({ ...formData, checked: !formData.checked })
                }
                checked={formData.checked}
              />
              <span>Use the same picture</span>
            </label>
          )}
          <label style={{ margin: "500px" }}>
            <input
              type="checkbox"
              onChange={() => setFormData({ ...formData, URI: !formData.URI })}
              checked={formData.URI}
            />
            <span>Use URI</span>
          </label>
          {adding && !formData.URI && (
            <ImageUploader handleChange={handleInputFileChange}></ImageUploader>
          )}
          {!formData.checked && formData.URI && (
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="pictureUrl"
                  id="pictureUrl"
                  placeholder="Picture URI"
                  onChange={handleChange}
                  value={formData.pictureUrl}
                />
              </div>
            </div>
          )}

          {!adding && !formData.checked && (
            <ImageUploader handleChange={handleInputFileChange}></ImageUploader>
          )}
          {/*DESCRIPTION*/}
          <div className="row" style={{ margin: "30px 0px 0px 0px" }}>
            <div className="input-field col s12">
              <i className="material-icons prefix">edit </i>
              <textarea
                id="detailedDescription"
                name="detailedDescription"
                palceholder="Detailed description"
                className="materialize-textarea"
                onChange={handleChange}
                value={formData.detailedDescription}
              ></textarea>
              <label htmlFor="detailedDescription">Detailed description</label>
              <div
                style={{ fontSize: "13px" }}
                className={
                  formData.detailedDescription.length < 2048
                    ? "blue-text small right-align"
                    : "red-text small right-align"
                }
              >
                {formData.detailedDescription.length}/2048
              </div>
            </div>
          </div>

          {/*TAGS*/}
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">flag </i>
              <textarea
                id="tags"
                name="tags"
                className="materialize-textarea"
                palceholder="Tags"
                onChange={handleChange}
                value={formData.tags}
              ></textarea>
              <label htmlFor="tags">Tags</label>
            </div>
          </div>

          {/*PRODUCTS*/}
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">restaurant</i>
              <textarea
                id="products"
                name="products"
                className="materialize-textarea"
                palceholder="Products"
                onChange={handleChange}
                value={formData.products}
              ></textarea>
              <label htmlFor="products">Products</label>
            </div>
          </div>

          {/*TIME*/}
          <div className="input-field col s6">
            <input
              type="text"
              pattern="[0-9]*"
              onChange={handleChange}
              value={formData.preparationTime}
              palceholder="Time for cooking"
              name="preparationTime"
            />
            <label htmlFor="preparationTime">Preparation Time</label>
          </div>
        </form>
        <button
          className="btn waves-effect waves-light modal-close"
          name="new"
          onClick={adding ? addNewRecipe : editExistingRecipe}
        >
          Submit new recipe
          <i className="material-icons right">send</i>
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);
