import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  disease: null,
  editDisease: false
}

const diseaseSlice = createSlice({
  name: "disease",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setDisease: (state, action) => {
      state.disease = action.payload
    },
    setEditDisease: (state, action) => {
      state.editDisease = action.payload
    },
    resetDiseaseState: (state) => {
      state.step = 1
      state.disease = null
      state.editDisease = false
    },
  },
})

export const {
  setStep,
  setDisease,
  setEditDisease,
  resetDiseaseState,
} = diseaseSlice.actions

export default diseaseSlice.reducer