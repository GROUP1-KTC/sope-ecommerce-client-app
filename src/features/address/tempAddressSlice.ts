import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { District, Province, Ward } from "~/components/checkout/TempAddressSection";

import { TempAddress } from '~/types/address';


const initialState: TempAddress = {
  fullName: '',
  phone: '',
  province: null,
  district: null,
  ward: null,
  detailedAddress: '',
  email: '',
  isDefault: false,
};

const addressSlice = createSlice({
  name: 'tempAddress',
  initialState,
  reducers: {
    setAddress(state, action: PayloadAction<TempAddress>) {
      return { ...state, ...action.payload };
    },
    updateAddressField(
      state,
      action: PayloadAction<{ key: keyof TempAddress; value: string | boolean | null | Province | District | Ward }>,
    ) {
      const { key, value } = action.payload;
      (state[key] as any) = value;
    },
    resetAddress() {
      return initialState;
    },
  },
});

export const { setAddress, updateAddressField, resetAddress } = addressSlice.actions;
export default addressSlice.reducer;
