import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "../store/companyStore";
import { SpinnerLoading } from "../components/molecules/SpinnerLoading";
import { useUsersStore } from "../store/UsersStore";
import { AdblockPage } from "../components/molecules/AdblockPage";
import { KardexPuntoTemplate } from "../components/templates/KardexPuntoTemplate";
import { useState } from "react";
import { usePuntosStore } from "../store/PuntosStore";
import { useKardexPuntoStore } from "../store/KardexPuntoStore";
import { useProductsStore } from "../store/ProductsStore";

export const KardexPunto = () => {
  const [selectedPunto, setSelectedPunto] = useState(null);
  const { dataKardexPunto, showKardexPunto, searchKardex, buscador } =
    useKardexPuntoStore();
  const searhProductPunto = useProductsStore(
    (state) => state.searhProductPunto
  );
  const buscadorProductos = useProductsStore((state) => state.buscador);
  const { showPuntos, dataPuntos } = usePuntosStore();
  const dataPermisos = useUsersStore((state) => state.dataPermisos);
  const dataCompany = useCompanyStore((state) => state.dataCompany);
  const statePermiso = dataPermisos.some((element) =>
    element.modulos.nombre.includes("Kardex")
  );

  useQuery({
    queryKey: ["mostrar puntos finales", dataCompany?.id],
    queryFn: () => showPuntos({ id_empresa: dataCompany?.id }),
    enabled: !!dataCompany?.id,
    onSuccess: (data) => {
      if (data.length > 0) {
        setSelectedPunto(data[0].id);
      }
    },
  });
  useQuery({
    queryKey: [
      "buscar productos punto",
      { _id_empresa: dataCompany?.id, buscador: buscadorProductos },
    ],
    queryFn: () =>
      searhProductPunto({
        _id_empresa: dataCompany?.id,
        buscador: buscadorProductos,
      }),
    enabled: dataCompany?.id != null,
  });
  const { isLoading, error } = useQuery({
    queryKey: [
      "mostrar kardex punto",
      { id_empresa: dataCompany?.id, selectedPunto },
    ],
    queryFn: () =>
      showKardexPunto({ id_empresa: dataCompany?.id, id_punto: selectedPunto }),
    enabled: !!dataCompany?.id && selectedPunto !== null,
  });
  useQuery({
    queryKey: [
      "buscar kardex punto",
      {
        id_empresa: dataCompany.id,
        id_punto: selectedPunto,
        buscador: buscador,
      },
    ],
    queryFn: () =>
      searchKardex({
        id_empresa: dataCompany.id,
        id_punto: selectedPunto,
        buscador: buscador,
      }),
    enabled: !!dataCompany?.id && selectedPunto !== null,
  });
  const handlePuntoChange = (event) => {
    setSelectedPunto(Number(event.target.value));
  };
  if (statePermiso == false) {
    return <AdblockPage state={statePermiso} />;
  }
  if (isLoading) {
    return <SpinnerLoading />;
  }
  if (error) {
    return <span>Error...</span>;
  }

  return (
    <KardexPuntoTemplate
      data={dataKardexPunto}
      selectedPunto={selectedPunto}
      dataPuntos={dataPuntos}
      handlePuntoChange={handlePuntoChange}
    />
  );
};
