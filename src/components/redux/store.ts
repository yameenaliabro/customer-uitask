import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './customerSlice';

const store = configureStore({
    reducer: {
        users: customerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
