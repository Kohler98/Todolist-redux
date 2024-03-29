import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState:{
    status:'not-authenticated',//'not-authentcadated', 'authenticated'
    uid:null,
    email:null,
    displayName:null,
    photoUrl:null,
    errorMessage:null
  },
  reducers: {
    login:(state,{payload})=>{
        state.status='authenticated';//'not-authenticated', 'authenticated'
        state.uid=payload.uid;
        state.email=payload.email;
        state.displayName=payload.displayName;
        state.photoUrl=payload.photoURL;
        state.errorMessage=payload.errorMessage;

    },
    logout:(state,{payload})=>{

        state.status='not-authenticated';//'not-authenticated', 'authenticated'
        state.uid=null;
        state.email=null;
        state.displayName=null;
        state.photoUrl=null;
        state.errorMessage=payload?payload.errorMessage:null;
    },
    checkingCredentials:(state)=>{
        state.status = 'checking'
    }
  },
})
export const { login,logout,checkingCredentials} = authSlice.actions
export default authSlice.reducer