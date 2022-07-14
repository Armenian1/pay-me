import { createSlice } from '@reduxjs/toolkit';

interface SettingsState {
   isDarkModeOn: boolean;
}

const initialState: SettingsState = {
   isDarkModeOn: false,
};

export const settingsSlice = createSlice({
   name: 'settings',
   initialState,
   reducers: {
      toggleDarkMode: (state) => {
         state.isDarkModeOn = !state.isDarkModeOn;
      },
   },
});

export const { toggleDarkMode } = settingsSlice.actions;

export default settingsSlice.reducer;
