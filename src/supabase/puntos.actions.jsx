import { supabase } from "./supabase.config";
import Swal from "sweetalert2";

export async function InsertPuntos(p) {
  const { error } = await supabase.rpc("insertarpuntos", p);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
}

export async function ShowPuntos(p) {
  const { data } = await supabase
    .from("puntos")
    .select()
    .eq("id_empresa", p.id_empresa)
    .order("id", { ascending: true });
  return data;
}

export async function DeletePuntos(p) {
  const { error } = await supabase.from("puntos").delete().eq("id", p.id);
  if (error) {
    alert("Error al eliminar", error.message);
  }
}

export async function UpdatePuntos(p) {
  const { error } = await supabase.from("puntos").update(p).eq("id", p.id);
  if (error) {
    alert("Error al editar Puntos", error.message);
  }
}

export async function SearchPuntos(p) {
  const { data } = await supabase
    .from("puntos")
    .select()
    .eq("id_empresa", p.id_empresa)
    .ilike("nombre", "%" + p.nombre + "%");
  return data;
}
