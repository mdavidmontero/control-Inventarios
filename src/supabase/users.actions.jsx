import Swal from "sweetalert2";
import { supabase } from "./supabase.config";
import { getIdAuthSupabase } from "./globalSupabase";

export const InsertUsers = async (p) => {
  const { data, error } = await supabase
    .from("usuarios")
    .insert(p)
    .select()
    .maybeSingle();
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "A ocurrido un error al insertar el usuario" + error.message,
    });
  }
  if (data) return data;
};

export const ShowUsers = async () => {
  const idAuthsupabase = await getIdAuthSupabase();
  const { error, data } = await supabase
    .from("usuarios")
    .select()
    .eq("idauth", idAuthsupabase)
    .maybeSingle();
  if (error) {
    throw new Error("A ocurrido un error al mostrar usuarios", error);
  }
  if (data) {
    return data;
  }
};
