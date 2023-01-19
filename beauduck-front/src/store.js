import { configureStore } from '@reduxjs/toolkit';
import consultingReducer from './features/help/ConsultingSlice';

export const store = configureStore({
  reducer: {
    consulting: consultingReducer,
  },
});
