import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

export const fetchPosts = createAsyncThunk("Posts/fetchPosts", async () => {
  try {
    const response = await API.get("/post");
    return response.data.data;
  } catch (error) {
    console.log(error.message);
  }
});

const initialState = {
  posts: [],
  filtered: [],
};

const postSlices = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // fetchAllPosts: (state, action) => {
    //   state.posts = action.payload;
    //   if (flag === 1) {
    //     state.filtered = action.payload;
    //     flag = 0;
    //   }
    // },
    filterPosts: (state, action) => {
      const filteredList = state.posts.filter(
        (post) =>
          post.body.toLowerCase().includes(action.payload.toLowerCase()) ||
          post.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.filtered = filteredList;
    },
    addPost: (state, action) => {
      state.filtered = [...state.filtered, action.payload];
    },
    delete1Post: (state, action) => {
      state.filtered = action.payload;
    },
    addComment: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: {
    [fetchPosts.pending]: () => console.log("pending"),
    [fetchPosts.fulfilled]: (state, action) => {
      console.log("fetched");
      state.posts = action.payload;
      state.filtered = action.payload;
    },
    [fetchPosts.rejected]: () => console.log("rejected"),
  },
});

export const { fetchAllPosts, filterPosts, delete1Post, addPost, addComment } =
  postSlices.actions;

export default postSlices.reducer;

// import postReducer from "./postSlice"
// import { configureStore } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage';
// import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// import thunk from 'redux-thunk';

// const reducers = combineReducers({
//   posts: postReducer,
// });

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

// const store = configureStore({
//   reducer: persistedReducer,
//   devTools: process.env.NODE_ENV !== 'production',
//   middleware: [thunk],
// });

// export default store;
