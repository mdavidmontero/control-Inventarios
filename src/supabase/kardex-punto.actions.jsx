import { supabase } from "./supabase.config";
import Swal from "sweetalert2";

export async function InsertKardexPunto(p) {
  const { error } = await supabase.from("kardex_punto").insert(p);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
}

export async function ShowKardexPunto(p) {
  const { data } = await supabase
    .rpc("mostrarkardexpunto", {
      _id_empresa: p.id_empresa,
      _id_punto: p.id_punto,
    })
    .order("id", { ascending: false });
  return data;
}

export async function DeleteKardexPunto(p) {
  const { error } = await supabase.from("kardex_punto").delete().eq("id", p.id);
  if (error) {
    alert("Error al eliminar el movimiento", error);
  }
}

export async function UpdateKardexPunto(p) {
  const { error } = await supabase
    .from("kardex_punto")
    .update(p)
    .eq("id", p.id);
  if (error) {
    alert("Error al actualizar la marca", error);
  }
}

export async function SearchKardexPunto(p) {
  const { data } = await supabase
    .rpc("buscarkardexpunto", {
      _id_empresa: p.id_empresa,
      _id_punto: p.id_punto,
      buscador: p.buscador,
    })
    .order("id", { ascending: false });
  return data;
}
