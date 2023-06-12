import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import gameSettingsReducer from './GameSettingsSlice';
import gameCycleReducer from './GameCycleSlice';
import gameDataReducer from './GameDataSlice';
import stopwatchReducer from './StopwatchSlice';

const persistConfig = {
  key: 'root',
  storage,
};

export const rootReducer = combineReducers({
  gameSettings: gameSettingsReducer,
  gameCycle: gameCycleReducer,
  gameData: gameDataReducer,
  stopwatch: stopwatchReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
