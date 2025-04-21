/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Referencia {
  paymentId: number;
  reference: string;
  status: string;
  [key: string]: any;
}

interface Estado {
  lista: Referencia[];
}

const initialState: Estado = {
  lista: [],
};

export const referenceSlice = createSlice({
  name: 'referencias',
  initialState,
  reducers: {
    agregarReferencia: (state, action: PayloadAction<Referencia>) => {
        state.lista.unshift(action.payload); 
      },
    setReferencias: (state, action: PayloadAction<Referencia[]>) => {
      state.lista = action.payload;
    },
    actualizarEstado: (state, action: PayloadAction<{ reference: string; status: string }>) => {
      const index = state.lista.findIndex(r => r.reference === action.payload.reference);
      if (index !== -1) {
        state.lista[index].status = action.payload.status;
      }
    },
  },
});

export const { setReferencias, actualizarEstado, agregarReferencia } = referenceSlice.actions;
export default referenceSlice.reducer;
