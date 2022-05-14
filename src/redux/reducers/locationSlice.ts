import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationState {
  origin: Coordinates | null;
}

const initialState: LocationState = {
  origin: null,
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setOrigin: (state, action: PayloadAction<Coordinates>) => {
      state.origin = {...action.payload};
    },
  },
});

export const {setOrigin} = locationSlice.actions;
export const selectOrigin = (state: RootState) => state.location.origin;
export default locationSlice.reducer;
