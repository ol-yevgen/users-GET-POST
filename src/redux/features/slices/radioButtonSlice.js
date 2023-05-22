import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    radioButton: [],
    radioButtonLoadingStatus: 'idle',
}

export const fetchRadioButton = createAsyncThunk(
    'radioButtonSlice/fetchRadioButton',
    async () => {
        return await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/positions`)
            .then(res => res.json());
    }
);

const radioButtonSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        radioButtonFetching: state => { state.radioButtonLoadingStatus = 'loading' },
        radioButtonFetched: (state, action) => {
            state.radioButton = action.payload
            state.radioButtonLoadingStatus = 'idle'
        },
        radioButtonFetchingError: state => {
            state.radioButtonFetchingError = 'error'
        },

    }, extraReducers: (builder) => {
        builder
            .addCase(fetchRadioButton.pending, state => { state.radioButtonLoadingStatus = 'loading' })
            .addCase(fetchRadioButton.fulfilled, (state, action) => {
                state.radioButton = action.payload.positions
                state.radioButtonLoadingStatus = 'idle'
            })
            .addCase(fetchRadioButton.rejected, state => {
                state.radioButtonFetchingError = 'error'
            })
            .addDefaultCase(() => { })
    }
})

const { actions, reducer } = radioButtonSlice;

export default reducer;
export const {
    radioButtonFetching,
    radioButtonFetched,
    radioButtonFetchingError,
} = actions;