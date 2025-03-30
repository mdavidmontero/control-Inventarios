import { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../organisms/Header";
import { ContentFiltro } from "../atoms/ContentFilter";
import { Title } from "../atoms/Title";
import { BtnFilter } from "../molecules/BtnFilter";
import { Lottieanimacion } from "../molecules/Lottieanimacion";
import { v } from "../../styles/variables";
import vacio from "../../assets/vacio.json";
import { RegisterInventarioPunto } from "../organisms/forms/RegisterInventarioPunto";
import { ContainerSelector } from "../atoms/ContainerSelector";
import { TableInventariosPuntos } from "../organisms/tables/TableInventariosPunto";

export const PuntosInventarioTemplate = ({
  data,
  selectedPunto,
  dataPuntos,
  handlePuntoChange,
}) => {
  const [openRegistro, setOpenRegistro] = useState(false);
  const [state, setState] = useState(false);
  const [accion, setAccion] = useState("");
  const [dataSelect, setDataSelect] = useState([]);
  useEffect(() => {
    if (dataPuntos?.length > 0 && !selectedPunto) {
      handlePuntoChange({ target: { value: dataPuntos[0].id } });
    }
  }, [dataPuntos, selectedPunto, handlePuntoChange]);

  const nuevoRegistro = () => {
    setOpenRegistro(!openRegistro);
    setAccion("Nuevo");
    setDataSelect([]);
  };

  return (
    <Container>
      {openRegistro && (
        <RegisterInventarioPunto
          dataSelect={dataSelect}
          accion={accion}
          onClose={() => setOpenRegistro(!openRegistro)}
        />
      )}

      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>

      <section className="area1">
        <ContainerSelector>
          <label htmlFor="puntos">Seleccionar Punto:</label>
          <StyledSelect
            id="puntos"
            value={selectedPunto || ""}
            onChange={handlePuntoChange}
          >
            {dataPuntos?.map((punto) => (
              <option key={punto.id} value={punto.id}>
                {punto.nombre}
              </option>
            ))}
          </StyledSelect>
        </ContainerSelector>
        <ContentFiltro>
          <Title>Inventario por Punto</Title>
          <BtnFilter
            funcion={nuevoRegistro}
            bgcolor="#f6f3f3"
            textcolor="#353535"
            icono={<v.agregar />}
          />
        </ContentFiltro>
      </section>

      <section className="main">
        {data.length === 0 ? (
          <Lottieanimacion alto="300" ancho="300" animacion={vacio} />
        ) : (
          <TableInventariosPuntos
            data={data}
            SetopenRegistro={setOpenRegistro}
            setdataSelect={setDataSelect}
            setAccion={setAccion}
          />
        )}
      </section>
    </Container>
  );
};
const Container = styled.div`
  min-height: 100vh;
  padding: 15px;
  width: 100%;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  grid-template:
    "header" 100px
    "area1" auto
    "area2" 60px
    "main" auto;

  .header {
    grid-area: header;
    display: flex;
    align-items: center;
  }
  .area1 {
    grid-area: area1;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  .area2 {
    grid-area: area2;
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .main {
    grid-area: main;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  max-width: 300px;
  padding: 12px 15px;
  border: 2px solid #ccc;
  background: #fff;
  color: #333;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease-in-out;
  appearance: none; /* Oculta la flecha nativa */
  font-weight: 500;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;

  &:hover {
    border-color: #007bff;
    background-color: #f0f8ff;
  }

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px #007bff;
  }

  option {
    background: #fff;
    color: #333;
    font-size: 1rem;
    font-weight: 500;
    padding: 10px;
  }

  /* Mejora la accesibilidad */
  &:disabled {
    background: #e0e0e0;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px;
    max-width: 100%;
  }
`;

export default PuntosInventarioTemplate;
