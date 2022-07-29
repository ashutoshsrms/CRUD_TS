import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  axios  from "axios";



export const getPost:any = createAsyncThunk("post/getPost", async (id: number) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});


export const deletePost:any = createAsyncThunk(
  "post/deletePost",
  async (id ) => {
    return axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    }).then((res) => res);
  }
);




export const createPost = createAsyncThunk(
  "post/createPost",
  async (values ) => {
    try{
    const res = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
        body: JSON.stringify( 
         title: values.title,
         body: values.body,
    ),
    });
    return res.data;
  }catch(err){
    return err
  }
}
);


export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ id:, title, body }) => {
    const res= await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
      }),
    })
    return res.data;
  }
);



const PostSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
    loading: false,
    error: null,
    body: "",
    edit: false,
  },
  reducers: {
    setEdit: (state, action) => {
      state.edit = action.payload.edit;
      state.body = action.payload.body;
    },
  },
  extraReducers: {
    [getPost.pending]: (state:any, action:any) => {
      state.loading = true;
    },
    [getPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [getPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deletePost.pending]: (state) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createPost.pending]: (state, action) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updatePost.pending]: (state, action) => {
      state.loading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [updatePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { setEdit } = PostSlice.actions;
export default PostSlice.reducer;