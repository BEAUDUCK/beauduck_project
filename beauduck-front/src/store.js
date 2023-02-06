import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import consultingReducer from './features/help/ConsultingSlice';
import boardReducer from './features/board/BoardSlice';
import singleReducer from './features/single/SingleSlice';
import memberReducer from './features/login/MemberSlice';
import profileReducer from './features/profile/ProfileSlice';

// 새로운  persist 선언
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  consulting: consultingReducer,
  board: boardReducer,
  single: singleReducer,
  member: memberReducer,
  profile: profileReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default { store, persistor };
