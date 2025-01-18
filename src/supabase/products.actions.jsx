import { supabase } from "./supabase.config";
import Swal from "sweetalert2";

export async function InsertProducts(p) {
  const { error } = await supabase.rpc("insertarproductos", p);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
}

export async function ShowProducts(p) {
  const { data } = await supabase.rpc("mostrarproductos", p);
  return data;
}

export async function DeleteProducts(p) {
  const { error } = await supabase.from("productos").delete().eq("id", p.id);
  if (error) {
    alert("Error al eliminar", error.message);
  }
}

export async function UpdateProducts(p) {
  const { error } = await supabase.from("productos").update(p).eq("id", p.id);
  if (error) {
    alert("Error al editar Productos", error.message);
  }
}

export async function SearchProducts(p) {
  const { data } = await supabase.rpc("buscarproductos", p);
  return data;
}
