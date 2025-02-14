// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './src/features/auth/authSlice';
import taskReducer from './src/features/task/taskSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});

export default store;
