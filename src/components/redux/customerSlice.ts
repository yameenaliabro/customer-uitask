
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Customer } from '../../types/customer';
import { CustomerState } from '../../types/redux';

const initialState: CustomerState = {
    customers: [],
    loading: false,
    error: null,
};

export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
    const response = await axios.get('https://reqres.in/api/users?page=1');
    return response.data.data;
});

export const addCustomer = createAsyncThunk('customers/addCustomer', async (customer: Customer) => {
    const response = await axios.post('https://reqres.in/api/users', customer);
    return response.data;
});

const customerSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        deleteCustomer: (state, action: PayloadAction<number>) => {
            state.customers = state.customers.filter(customer => customer.id !== action.payload);
        },
        editCustomer: (state, action: PayloadAction<Customer>) => {
            const index = state.customers.findIndex(customer => customer.id === action.payload.id);
            if (index !== -1) {
                state.customers[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCustomers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCustomers.fulfilled, (state, action: PayloadAction<Customer[]>) => {
            state.loading = false;
            state.customers = action.payload;
        });
        builder.addCase(fetchCustomers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch customers';
        });

        builder.addCase(addCustomer.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
            state.loading = false;
            state.customers.push(action.payload);
        });
        builder.addCase(addCustomer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to add customer';
        });
    },
});

export const { deleteCustomer, editCustomer } = customerSlice.actions;
export default customerSlice.reducer;