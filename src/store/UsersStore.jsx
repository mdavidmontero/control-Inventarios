import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";
import { InsertUsers } from "../supabase/users.actions";

export const useUsersStore = create((set, get) => ({
  insertUserAdmin: async (p) => {
    const { data, error } = await supabase.auth.signUp({
      email: p.correo,
      password: p.pass,
    });
    if (error) return;
    const datauser = await InsertUsers({
      idauth: data.user.id,
      fecharegistro: new Date(),
      tipouser: "admin",
    });
    return datauser;
  },
}));
