import { useQuery } from "@tanstack/react-query";
import { BrandingTemplate } from "../components/templates/BrandringTemplate";
import { useBrandStore } from "../store/BrandStore";
import { useCompanyStore } from "../store/companyStore";
import { SpinnerLoading } from "../components/molecules/SpinnerLoading";

export const Branding = () => {
  const { showBrand, dataBrand, searchBrand, buscador } = useBrandStore();
  const dataCompany = useCompanyStore((state) => state.dataCompany);
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar marca", { id_empresa: dataCompany?.id }],
    queryFn: () => showBrand({ id_empresa: dataCompany?.id }),
    enabled: dataCompany?.id != null,
  });

  const { data: searchdata } = useQuery({
    queryKey: [
      "buscar marca",
      { id_empresa: dataCompany.id, descripcion: buscador },
    ],
    queryFn: () =>
      searchBrand({ id_empresa: dataCompany.id, descripcion: buscador }),
    enabled: dataCompany.id != null,
  });
  if (isLoading) {
    return <SpinnerLoading />;
  }
  if (error) {
    return <span>Error...</span>;
  }

  return <BrandingTemplate data={dataBrand} />;
};
