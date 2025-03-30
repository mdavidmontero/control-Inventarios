import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SpinnerLoading } from "../components/molecules/SpinnerLoading";
import { useCompanyStore } from "../store/companyStore";
import { useInventariosPuntosStore } from "../store/InventarioPuntosStore";
import { PuntosInventarioTemplate } from "../components/templates/InventarioProductosTemplate";
import { useProductsStore } from "../store/ProductsStore";
import { usePuntosStore } from "../store/PuntosStore";
import { useUsersStore } from "../store/UsersStore";
import { AdblockPage } from "../components/molecules/AdblockPage";

export const InventarioProductosPunto = () => {
  const { dataInventarioPuntos, showInventarioPuntos } =
    useInventariosPuntosStore();
  const dataCompany = useCompanyStore((state) => state.dataCompany);
  const { showPuntos, dataPuntos } = usePuntosStore();
  const { showproducts } = useProductsStore();
  const [selectedPunto, setSelectedPunto] = useState(null);
  const dataPermisos = useUsersStore((state) => state.dataPermisos);
  const statePermiso = dataPermisos.some((element) =>
    element.modulos.nombre.includes("Inventario por Punto")
  );

  useQuery({
    queryKey: ["mostrar puntos", dataCompany?.id],
    queryFn: () => showPuntos({ id_empresa: dataCompany?.id }),
    enabled: !!dataCompany?.id,
    onSuccess: (data) => {
      if (data.length > 0) {
        setSelectedPunto(data[0].id);
      }
    },
  });

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar inventario punto", dataCompany?.id, selectedPunto],
    queryFn: () =>
      showInventarioPuntos({
        id_empresa: dataCompany?.id,
        id_punto: selectedPunto,
      }),
    enabled: !!dataCompany?.id && selectedPunto !== null,
  });

  useQuery({
    queryKey: ["mostrar productos", dataCompany?.id],
    queryFn: () => showproducts({ _id_empresa: dataCompany?.id }),
    enabled: !!dataCompany?.id,
  });

  const handlePuntoChange = (event) => {
    setSelectedPunto(Number(event.target.value));
  };

  if (statePermiso == false) {
    return <AdblockPage state={statePermiso} />;
  }
  if (isLoading) return <SpinnerLoading />;
  if (error) return <span>Error...</span>;

  return (
    <PuntosInventarioTemplate
      data={dataInventarioPuntos}
      selectedPunto={selectedPunto}
      dataPuntos={dataPuntos}
      handlePuntoChange={handlePuntoChange}
    />
  );
};
