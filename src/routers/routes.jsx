import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { ProtectedRoute } from "../hooks/ProtectedRoute";
import { UserAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useUsersStore } from "../store/UsersStore";
import { SpinnerLoading } from "../components/molecules/SpinnerLoading";
import { Errors } from "../components/molecules/Errors";
import { useCompanyStore } from "../store/companyStore";
import { Configuration } from "../pages/Configuration";
import { Branding } from "../pages/Brand";
import { Category } from "../pages/Category";
import { Products } from "../pages/Products";
import { Users } from "../pages/Users";

export function MyRoutes() {
  const { user } = UserAuth();
  const showUsers = useUsersStore((state) => state.showUsers);
  const idUsuario = useUsersStore((state) => state.idUsuario);
  const showPermisos = useUsersStore((state) => state.showPermisos);
  const showCompany = useCompanyStore((state) => state.showCompany);
  const {
    data: dataUsers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mostrar usuarios"],
    queryFn: showUsers,
  });

  useQuery({
    queryKey: ["mostrar empresa"],
    queryFn: () => showCompany({ idusaurio: idUsuario }),
    enabled: !!dataUsers,
  });

  useQuery({
    queryKey: ["mostrar permisos", { id_usuario: idUsuario }],
    queryFn: () => showPermisos({ id_usuario: idUsuario }),
    enabled: !!dataUsers,
  });

  if (isLoading) {
    return <SpinnerLoading />;
  }
  if (error) {
    return <Errors mensaje={error.message} />;
  }
  return (
    <Routes>
      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        <Route path="/" element={<Home />} />
        <Route path="/configurar" element={<Configuration />} />
        <Route path="/configurar/marca" element={<Branding />} />
        <Route path="/configurar/categorias" element={<Category />} />
        <Route path="/configurar/productos" element={<Products />} />
        <Route path="/configurar/personal" element={<Users />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
