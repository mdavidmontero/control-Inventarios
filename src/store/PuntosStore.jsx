import { create } from "zustand";
import {
  DeletePuntos,
  InsertPuntos,
  SearchPuntos,
  ShowPuntos,
  UpdatePuntos,
} from "../supabase/puntos.actions";

export const usePuntosStore = create((set, get) => ({
  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  dataPuntos: [],
  puntosItemSelect: [],
  parametros: {},
  showPuntos: async (p) => {
    const response = await ShowPuntos(p);
    set({ parametros: p });
    set({ dataPuntos: response });
    set({ puntosItemSelect: response[0] });
    return response;
  },
  selectPuntos: (p) => {
    set({ puntosItemSelect: p });
  },
  insertPuntos: async (p) => {
    await InsertPuntos(p);
    const { showPuntos } = get();
    const { parametros } = get();
    set(showPuntos(parametros));
  },
  deletePunto: async (p) => {
    await DeletePuntos(p);
    const { showPuntos } = get();
    const { parametros } = get();
    set(showPuntos(parametros));
  },
  updatePuntos: async (p) => {
    await UpdatePuntos(p);
    const { showPuntos } = get();
    const { parametros } = get();
    set(showPuntos(parametros));
  },
  searchPunto: async (p) => {
    const response = await SearchPuntos(p);
    set({ dataPuntos: response });
  },
}));
