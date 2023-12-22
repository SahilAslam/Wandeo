import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface adminState {
    admin: any
}

const initialState: adminState = {
    admin: localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo') as string) : '',
}
console.log(initialState, "init")
const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.admin = action.payload;
            console.log(state.admin, "admin State")
            
            localStorage.setItem('adminInfo', JSON.stringify(state.admin?.adminCred))
            
        },
        logout: (state) => {
            state.admin = ''
            localStorage.removeItem("adminToken"); 
            localStorage.removeItem("adminId");
            localStorage.removeItem("adminInfo");           
        }
    }
})

export const { login, logout } = adminSlice.actions;
export const selectAdmin = (state: { admin: adminState }) => state.admin.admin;

export default adminSlice.reducer;