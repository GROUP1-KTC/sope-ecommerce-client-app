import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Address } from '~/types/address';

interface AddressState {
    addresses: Address[];
}

const initialState: AddressState = {
    addresses: [],
};

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        setAddresses: (state, action: PayloadAction<Address[]>) => {
            state.addresses = action.payload;
        },
        addAddressLocal: (state, action: PayloadAction<Address>) => {
            state.addresses.push(action.payload);
        },
        updateAddressLocal: (state, action: PayloadAction<Address>) => {
            const index = state.addresses.findIndex(
                (a) => a.id === action.payload.id,
            );
            if (index >= 0) state.addresses[index] = action.payload;
        },
        deleteAddressLocal: (state, action: PayloadAction<string>) => {
            state.addresses = state.addresses.filter(
                (a) => a.id !== action.payload,
            );
        },
    },
});

export const {
    setAddresses,
    addAddressLocal,
    updateAddressLocal,
    deleteAddressLocal,
} = addressSlice.actions;
export default addressSlice.reducer;
