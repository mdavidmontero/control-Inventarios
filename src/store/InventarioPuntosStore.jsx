import { create } from "zustand";
import {
  DeleteProductosPuntos,
  InsertProductosPunto,
  SearchProductosPuntos,
  ShowProductosPunto,
  UpdateProductosPuntos,
} from "../supabase/productos-puntos.actions";

export const useInventariosPuntosStore = create((set, get) => ({
  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  dataInventarioPuntos: [],
  inventarioPuntosItemSelect: [],
  parametros: {},
  showInventarioPuntos: async (p) => {
    const response = await ShowProductosPunto(p);
    set({ parametros: p, dataInventarioPuntos: response }); // ✅ Correcto
    return response;
  },

  selectInventarioPuntos: (p) => {
    set({ inventarioPuntosItemSelect: p });
  },
  insertInventarioPuntos: async (p) => {
    await InsertProductosPunto(p);
    const { showInventarioPuntos } = get();
    const { parametros } = get();
    set(showInventarioPuntos(parametros));
  },
  deleteInventarioPunto: async (p) => {
    await DeleteProductosPuntos(p);
    const { showInventarioPuntos } = get();
    const { parametros } = get();
    set(showInventarioPuntos(parametros));
  },
  updateInventarioPuntos: async (p) => {
    await UpdateProductosPuntos(p);
    const { showInventarioPuntos } = get();
    const { parametros } = get();
    set(showInventarioPuntos(parametros));
  },
  searchInventarioPunto: async (p) => {
    const response = await SearchProductosPuntos(p);
    set({ dataInventarioPuntos: response });
  },
}));
