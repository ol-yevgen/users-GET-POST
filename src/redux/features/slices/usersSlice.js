import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    usersLoadingStatus: 'idle',
    usersCount: 1,
    totalPages: 10
}

export const fetchUsers = createAsyncThunk(
    'usersSlice/fetchUsers',
    async (url) => {

        try {
            const response = await fetch(url, { method: 'get'});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch (e) {
            throw e;
        }
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersFetching: state => { state.usersLoadingStatus = 'loading' },
        usersFetched: (state, action) => {
            state.users = action.payload
            state.usersLoadingStatus = 'idle'
        },
        usersFetchingError: state => {
            state.usersFetchingError = 'error'
        },
        usersCleaned: (state, ) => {
            state.users = []
        },
        usersCount: (state) => {
            state.usersCount += 1
        },
        usersCountReset: (state) => {
            state.usersCount = 1
        },
        usersDeleted: (state, action) => {
            state.users = state.users.filter(item => item.id !== action.payload)
        }
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, state => { state.usersLoadingStatus = 'loading' })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.totalPages = action.payload['total_pages']
                state.users = [...state.users, ...action.payload.users]
                state.usersLoadingStatus = 'idle'
            })
            .addCase(fetchUsers.rejected, state => {
                state.usersFetchingError = 'error'
            })
            .addDefaultCase(() => { })
    }
})

const { actions, reducer } = usersSlice;

export default reducer;
export const {
    usersFetching,
    usersFetched,
    usersFetchingError,
    usersCleaned,
    usersCount,
    usersCountReset,
    usersDeleted
} = actions;