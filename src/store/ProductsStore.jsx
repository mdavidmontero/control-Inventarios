import { create } from "zustand";
import {
  DeleteProducts,
  InsertProducts,
  ReportInventarioValorado,
  ReportKardexEntradaSalida,
  ReportStockBajoMinimo,
  ReportStockProductsAll,
  ReportStockXProducto,
  SearchProductPunto,
  SearchProducts,
  ShowProducts,
  UpdateProducts,
} from "../supabase/products.actions";

export const useProductsStore = create((set, get) => ({
  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  setItemSelect: (p) => {
    set({ productosItemSelect: p });
  },
  setItemSelectPuntoProduct: (p) => {
    set({ productosItemSelectPunto: p });
  },
  dataproductos: [],
  dataproductosPunto: [],
  productosItemSelect: [],
  productosItemSelectPunto: [],
  parametros: {},
  showproducts: async (p) => {
    const response = await ShowProducts(p);
    set({ parametros: p });
    set({ dataproductos: response });
    // Todo revisar esto
    set({ productosItemSelect: response[0] });
    return response;
  },
  selectproducts: (p) => {
    set({ productosItemSelect: p });
  },
  selectproductsPunto: (p) => {
    set({ productosItemSelectPunto: p });
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
    return response;
  },
  searhProductPunto: async (p) => {
    const response = await SearchProductPunto(p);
    set({ dataproductosPunto: response });
    return response;
  },
  reportStoreProductosAll: async (p) => {
    const response = await ReportStockProductsAll(p);
    return response;
  },
  reportStockxProducto: async (p) => {
    const response = await ReportStockXProducto(p);
    return response;
  },
  reportBajoMinimo: async (p) => {
    const response = await ReportStockBajoMinimo(p);
    return response;
  },
  reportKardexEntradaSalida: async (p) => {
    const response = await ReportKardexEntradaSalida(p);
    return response;
  },
  reportInventarioValorado: async (p) => {
    const response = await ReportInventarioValorado(p);
    return response;
  },
}));
