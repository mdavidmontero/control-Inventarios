import { useState } from "react";
import { useCategoryStore } from "../../store/CategoryStore";
import styled from "styled-components";
import { Header } from "../organisms/Header";
import { ContentFiltro } from "../atoms/ContentFilter";
import { Title } from "../atoms/Title";
import { BtnFilter } from "../molecules/BtnFilter";
import { Buscador } from "../organisms/Buscador";
import { Lottieanimacion } from "../molecules/Lottieanimacion";
import { v } from "../../styles/variables";
import vacio from "../../assets/vacio.json";
import { TablePuntos } from "../organisms/tables/TablePuntos";
import { RegisterPunto } from "../organisms/forms/RegisterPunto";
import { usePuntosStore } from "../../store/PuntosStore";

export const PuntosTemplate = ({ data }) => {
  const [state, setState] = useState(false);
  const [dataSelect, setdataSelect] = useState([]);
  const [accion, setAccion] = useState("");
  const [openRegistro, SetopenRegistro] = useState(false);
  const nuevoRegistro = () => {
    SetopenRegistro(!openRegistro);
    setAccion("Nuevo");
    setdataSelect([]);
  };
  const setBuscador = usePuntosStore((state) => state.setBuscador);
  return (
    <Container>
      {openRegistro && (
        <RegisterPunto
          dataSelect={dataSelect}
          accion={accion}
          onClose={() => SetopenRegistro(!openRegistro)}
        />
      )}

      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="area1">
        <ContentFiltro>
          <Title>Puntos</Title>
          <BtnFilter
            funcion={nuevoRegistro}
            bgcolor="#f6f3f3"
            textcolor="#353535"
            icono={<v.agregar />}
          />
        </ContentFiltro>
      </section>
      <section className="area2">
        <Buscador setBuscador={setBuscador} />
      </section>
      <section className="main">
        {data.length == 0 && (
          <Lottieanimacion alto="300" ancho="300" animacion={vacio} />
        )}
        <TablePuntos
          data={data}
          SetopenRegistro={SetopenRegistro}
          setdataSelect={setdataSelect}
          setAccion={setAccion}
        />
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
