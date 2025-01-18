import { useQuery } from "@tanstack/react-query";

import { useCompanyStore } from "../store/companyStore";
import { SpinnerLoading } from "../components/molecules/SpinnerLoading";
import { CategoryTemplate } from "../components/templates/CategoryTemplate";
import { useCategoryStore } from "../store/CategoryStore";

export const Category = () => {
  const { showCategory, dataCategories, searchCategory, buscador } =
    useCategoryStore();
  const dataCompany = useCompanyStore((state) => state.dataCompany);
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar categoria", { id_empresa: dataCompany?.id }],
    queryFn: () => showCategory({ id_empresa: dataCompany?.id }),
    enabled: dataCompany?.id != null,
  });
  // TODO: revisar si funciona
  useQuery({
    queryKey: [
      "buscar categoria",
      { id_empresa: dataCompany.id, descripcion: buscador },
    ],
    queryFn: () =>
      searchCategory({ id_empresa: dataCompany.id, descripcion: buscador }),
    enabled: dataCompany.id != null,
  });
  if (isLoading) {
    return <SpinnerLoading />;
  }
  if (error) {
    return <span>Error...</span>;
  }

  return <CategoryTemplate data={dataCategories} />;
};
