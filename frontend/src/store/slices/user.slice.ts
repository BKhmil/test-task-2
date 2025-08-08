import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '../../interfaces/user.interface';

interface IIUserState {
	user: IUser | null;
}

const initialState: IIUserState = {
	user: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<IUser>) {
			state.user = action.payload;
		},
		removeUser(state) {
			state.user = null;
		},
	},
});

export const userSliceActions = { ...userSlice.actions };
export default userSlice;
