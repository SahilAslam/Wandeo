import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface adminState {
    admin: string
}

const initialState: adminState = {
    admin: '',
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.admin = action.payload;
        },
        logout: (state) => {
            state.admin = ''
            localStorage.removeItem("adminToken")
        }
    }
})

export const { login, logout } = adminSlice.actions;
export const selectAdmin = (state: { admin: adminState }) => state.admin.admin;

export default adminSlice.reducer;