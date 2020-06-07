import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (user) => {
    const response = await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  }
);

const UsersSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
    loading: "idle",
    currentRequestId: undefined,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      console.log("Pending...");
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },
    // you can mutate state directly, since it is using immer behind the scenes
    [registerUser.fulfilled]: (state, action) => {
      console.log("Fulfilled...");
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.entities.push(action.payload);
        state.currentRequestId = undefined;
      }
    },
    [registerUser.rejected]: (state, action) => {
      console.log("Rejected...");
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        console.log(
          "action error: ",
          action.error,
          "action payload:",
          action.payload
        );
        state.loading = "idle";
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});
const { actions, reducer } = UsersSlice;

export const selectState = (state) => state.users;
export const selectError = (state) => state.users.error;

export const { addNewUser, removeUser, editUser } = actions;
export default reducer;
