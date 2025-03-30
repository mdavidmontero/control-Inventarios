import { useQuery } from "@tanstack/react-query";
import { AdblockPage } from "../components/molecules/AdblockPage";
import { SpinnerLoading } from "../components/molecules/SpinnerLoading";
import { PuntosTemplate } from "../components/templates/PuntosTemplate";
import { useCompanyStore } from "../store/companyStore";
import { usePuntosStore } from "../store/PuntosStore";
import { useUsersStore } from "../store/UsersStore";

export const Puntos = () => {
  const { showPuntos, dataPuntos, searchPunto, buscador } = usePuntosStore();
  const dataPermisos = useUsersStore((state) => state.dataPermisos);

  const statePermiso = dataPermisos.some((element) =>
    element.modulos.nombre.includes("Puntos")
  );

  const dataCompany = useCompanyStore((state) => state.dataCompany);
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar puntos", { id_empresa: dataCompany?.id }],
    queryFn: () => showPuntos({ id_empresa: dataCompany?.id }),
    enabled: dataCompany?.id != null,
  });

  useQuery({
    queryKey: [
      "buscar punto",
      { id_empresa: dataCompany.id, nombre: buscador },
    ],
    queryFn: () =>
      searchPunto({ id_empresa: dataCompany.id, nombre: buscador }),
    enabled: dataCompany.id != null,
  });

  if (statePermiso == false) {
    return <AdblockPage state={statePermiso} />;
  }
  if (isLoading) {
    return <SpinnerLoading />;
  }
  if (error) {
    return <span>Error...</span>;
  }

  return <PuntosTemplate data={dataPuntos} />;
};
