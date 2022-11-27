import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   booksData:[],
   charactersData:[],
   housesData:[]
}

const BooksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
     setBooksData(state,action){
       state.booksData=action.payload
     },
     setCharactersData(state,action){
       state.charactersData=action.payload
     },
     setHousesData(state,action){
       state.housesData=action.payload
     }
   
  }
})


// reducers exports
export const {setBooksData , setCharactersData , setHousesData} = BooksSlice.actions;

export default BooksSlice.reducer;