import { createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface User {
    id: string,
    name: string,
    email: string
}

export interface UserState {
    user: User | null
}

const initialState: UserState = {
    user: localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData') as string)
    : null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction <User | null>) => {
            state.user = action.payload
            localStorage.setItem('userData', JSON.stringify(action.payload))
        },

        logout: (state) => {
            state.user = null
            localStorage.removeItem('userData')
            localStorage.removeItem('token')
        }
    }
})

export const { login, logout } = userSlice.actions;
export const selectUser = (state: {user: UserState}) => state.user.user;

export default userSlice.reducer;