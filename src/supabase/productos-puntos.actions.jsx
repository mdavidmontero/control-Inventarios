import { supabase } from "./supabase.config";
import Swal from "sweetalert2";

export async function InsertProductosPunto(p) {
  const { error } = await supabase.rpc("insertarproductospuntos", p);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
}
export async function ShowProductosPunto(p) {
  const { data, error } = await supabase.rpc("mostrarinventarioporpunto", {
    _id_empresa: p.id_empresa,
    _id_punto: p.id_punto,
  });
  if (error) {
    console.error("Error al obtener el inventario:", error);
    return null;
  }

  return data;
}

export async function DeleteProductosPuntos(p) {
  const { error } = await supabase
    .from("inventarios_puntos")
    .delete()
    .eq("id", p.id);
  if (error) {
    alert("Error al eliminar", error.message);
  }
}

export async function UpdateProductosPuntos(p) {
  const { error } = await supabase
    .from("inventarios_puntos")
    .update(p)
    .eq("id", p.id);
  if (error) {
    alert("Error al editar Puntos", error.message);
  }
}

export async function SearchProductosPuntos(p) {
  const { data } = await supabase
    .from("inventarios_puntos")
    .select()
    .eq("id_punto", p.id_punto);
  return data;
}
