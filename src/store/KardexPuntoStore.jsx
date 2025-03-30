import { create } from "zustand";
import {
  DeleteKardexPunto,
  InsertKardexPunto,
  SearchKardexPunto,
  ShowKardexPunto,
} from "../supabase/kardex-punto.actions";

export const useKardexPuntoStore = create((set, get) => ({
  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  dataKardexPunto: [],
  kardexPuntoItemSelect: [],
  parametros: {},
  showKardexPunto: async (p) => {
    const response = await ShowKardexPunto(p);
    set({ parametros: p });
    set({ dataKardexPunto: response });
    return response;
  },
  selectKardexPunto: (p) => {
    set({ kardexPuntoItemSelect: p });
  },
  insertKardexPunto: async (p) => {
    await InsertKardexPunto(p);
    const { showKardexPunto } = get();
    const { parametros } = get();
    set(showKardexPunto(parametros));
  },
  deleteKardexPunto: async (p) => {
    await DeleteKardexPunto(p);
    const { showKardexPunto } = get();
    const { parametros } = get();
    set(showKardexPunto(parametros));
  },
  // updateBrand: async (p) => {
  //   await UpdateBrand(p);
  //   const { showBrand } = get();
  //   const { parametros } = get();
  //   set(showBrand(parametros));
  // },
  searchKardex: async (p) => {
    const response = await SearchKardexPunto(p);
    set({ dataKardexPunto: response });
    return response;
  },
}));
