export const initialState = {
    status:'checking',
    uid:null,
    email:null,
    displayName:null,
    photoUrl:null,
    errorMessage:null
}
export const authenticatedState = {
    status:'authenticated',
    uid:"123ABC",
    email:"demo@google.com",
    displayName:"Demo user",
    photoUrl:null,
    errorMessage:null
}
export const notAuthenticated = {
    status:'not-authenticated',
    uid:null,
    email:null,
    displayName:null,
    photoUrl:null,
    errorMessage:null
}

export const demoUser = {
    uid:"ABC123",
    email:"demo@google.com",
    displayName:"Demo user",
    photoUrl:null,
}