import { create } from "zustand";
import {
  DeleteCategory,
  InsertCategory,
  SearchCategory,
  ShowCategory,
  UpdateCategory,
} from "../supabase/categories.actions";

export const useCategoryStore = create((set, get) => ({
  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  dataCategories: [],
  brandItemSelect: [],
  parametros: {},
  showCategory: async (p) => {
    const response = await ShowCategory(p);
    set({ parametros: p });
    set({ dataCategories: response });
    set({ CategoryItemSelect: response[0] });
    return response;
  },
  selectCategory: (p) => {
    set({ CategoryItemSelect: p });
  },
  insertCategorys: async (p) => {
    await InsertCategory(p);
    const { showCategory } = get();
    const { parametros } = get();
    set(showCategory(parametros));
  },
  deleteCategory: async (p) => {
    await DeleteCategory(p);
    const { showCategory } = get();
    const { parametros } = get();
    set(showCategory(parametros));
  },
  updateCategory: async (p) => {
    await UpdateCategory(p);
    const { showCategory } = get();
    const { parametros } = get();
    set(showCategory(parametros));
  },
  searchCategory: async (p) => {
    const response = await SearchCategory(p);
    set({ dataCategories: response });
  },
}));
