import { configureStore } from '@reduxjs/toolkit';
import users from './features/slices/usersSlice';
import radioButton from './features/slices/radioButtonSlice';

const stringMiddleware = ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }

    return next(action)
}

const store = configureStore({
    reducer: { users, radioButton },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;