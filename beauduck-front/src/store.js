import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import consultingReducer from './features/help/ConsultingSlice';
import boardReducer from './features/board/BoardSlice';

const reducers = combineReducers({
  consulting: consultingReducer,
  board: boardReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
