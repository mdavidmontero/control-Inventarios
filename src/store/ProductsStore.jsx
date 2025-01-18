import { create } from "zustand";
import {
  DeleteProducts,
  InsertProducts,
  SearchProducts,
  ShowProducts,
  UpdateProducts,
} from "../supabase/products.actions";

export const useProductsStore = create((set, get) => ({
  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  dataproductos: [],
  productosItemSelect: [],
  parametros: {},
  showproducts: async (p) => {
    const response = await ShowProducts(p);
    set({ parametros: p });
    set({ dataproductos: response });
    set({ productosItemSelect: response[0] });
    return response;
  },
  selectproducts: (p) => {
    set({ productosItemSelect: p });
  },
  insertproducts: async (p) => {
    await InsertProducts(p);
    const { showproducts } = get();
    const { parametros } = get();
    set(showproducts(parametros));
  },
  deleteproducts: async (p) => {
    await DeleteProducts(p);
    const { showproducts } = get();
    const { parametros } = get();
    set(showproducts(parametros));
  },
  updateproducts: async (p) => {
    await UpdateProducts(p);
    const { showproducts } = get();
    const { parametros } = get();
    set(showproducts(parametros));
  },
  searchproducts: async (p) => {
    const response = await SearchProducts(p);
    set({ dataproductos: response });
  },
}));
