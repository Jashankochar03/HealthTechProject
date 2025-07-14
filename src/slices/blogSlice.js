import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  blog: null,
  editBlog: false
}

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setBlog: (state, action) => {
      state.disease = action.payload
    },
    setEditBlog: (state, action) => {
      state.editDisease = action.payload
    },
    resetBlogState: (state) => {
      state.step = 1
      state.disease = null
      state.editDisease = false
    },
  },
})

export const {
  setStep,
  setBlog,
  setEditBlog,
  resetBlogState,
} = blogSlice.actions

export default blogSlice.reducer