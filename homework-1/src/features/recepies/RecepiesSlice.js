import { createSlice } from '@reduxjs/toolkit'

const RecipesSlice = createSlice({
    name: 'recipes',
    initialState: [{
        recipeID: "UNIQUE_ID_MAX_24_SYMBOLS",
        userID: "UNIQUE_ID_MAX_24_SYMBOLS",
        author: "admin",
        name: "Musaka, max 80 symbols",
        description: "Short description of the recepy, max 256 symbols",
        preparationTime: 60,
        products: ["Kartofi", "Meso"],
        pictureOfTheMeal: "http://assets.kulinaria.bg/attachments/pictures-images/0000/1918/MAIN-vegetarianska-musaka.jpg?1431936459",
        detailedDescription: "Up to 2048 symbols",
        tags: ["musaka", "meso", "kartofi", "#bgKuhnq"],
        postTime: Date.now(),
        lastModificationDate: Date.now()
    }],
    reducers: {
        addNewRecipe: (state, newRecipe) => {
            state.push(newRecipe.payload)
        },
        removeRecipe: (state, recipeID) => {
            return state.filter((recipe) => recipe.recipeID !== recipeID.payload);
        },
        editRecipe: (state, editedRecipe) => {
            return state.map((recipe) => recipe.recipeID === editedRecipe.payload.recipeID ? editedRecipe.payload : recipe)
        }
    }

})
const { actions, reducer } = RecipesSlice

export const selectUsers = state => state.initialState
export const { addNewRecipe, removeRecipe, editRecipe } = actions
export default reducer