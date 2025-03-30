import { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../organisms/Header";
import { ContentFiltro } from "../atoms/ContentFilter";
import { Title } from "../atoms/Title";
import { Buscador } from "../organisms/Buscador";
import { Btnsave } from "../molecules/BtnSave";
import { Tabs } from "../organisms/Tabs";
import { useKardexPuntoStore } from "../../store/KardexPuntoStore";
import { RegisterKardexPunto } from "../organisms/forms/RegisterKardexPunto";
import { ContainerSelector } from "../atoms/ContainerSelector";

export const KardexPuntoTemplate = ({
  data,
  selectedPunto,
  dataPuntos,
  handlePuntoChange,
}) => {
  const [state, setState] = useState(false);
  const [dataSelect, setdataSelect] = useState([]);
  const [accion, setAccion] = useState("");
  const [openRegistro, SetopenRegistro] = useState(false);
  const [tipo, setTipo] = useState("");

  useEffect(() => {
    if (dataPuntos?.length > 0 && !selectedPunto) {
      handlePuntoChange({ target: { value: dataPuntos[0].id } });
    }
  }, [dataPuntos, selectedPunto, handlePuntoChange]);
  function nuevaentrada() {
    SetopenRegistro(true);
    setTipo("entrada");
  }
  function nuevasalida() {
    SetopenRegistro(true);
    setTipo("salida");
  }

  const setBuscador = useKardexPuntoStore((state) => state.setBuscador);

  return (
    <Container>
      {openRegistro && (
        <RegisterKardexPunto
          dataSelect={dataSelect}
          accion={accion}
          tipo={tipo}
          onClose={() => SetopenRegistro(!openRegistro)}
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
          <Title>Kardex por Punto</Title>
          <Btnsave bgcolor="#52de65" titulo="+Entrada" funcion={nuevaentrada} />
          <Btnsave bgcolor="#fb6661" titulo="-Salida" funcion={nuevasalida} />
        </ContentFiltro>
      </section>
      <section className="area2">
        <Buscador setBuscador={setBuscador} />
      </section>
      <section className="main">
        <Tabs data={data} />
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
    "area1" 100px
    "area2" 100px
    "main" auto;

  .header {
    grid-area: header;
    /* background-color: rgba(103, 93, 241, 0.14); */
    display: flex;
    align-items: center;
  }
  .area1 {
    grid-area: area1;
    /* background-color: rgba(229, 67, 26, 0.14); */
    display: flex;
    align-items: center;
  }
  .area2 {
    grid-area: area2;
    /* background-color: rgba(77, 237, 106, 0.14); */
    display: flex;
    align-items: center;
    justify-content: end;
  }

  .main {
    margin-top: 20px;
    grid-area: main;
    /* background-color: rgba(179, 46, 241, 0.14); */
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
