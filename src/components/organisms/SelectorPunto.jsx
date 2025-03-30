import styled from "styled-components";

export function SelectorPunto({ color, state, funcion, texto1, opciones }) {
  return (
    <Container $color={color}>
      <select onChange={funcion} value={state}>
        <option value="">{texto1}</option>
        {opciones?.map((opcion) => (
          <option key={opcion.id} value={opcion.id}>
            {opcion.nombre}
          </option>
        ))}
      </select>
    </Container>
  );
}

const Container = styled.div`
  select {
    width: 100%;
    padding: 10px;
    border: 2px solid ${(props) => props.$color};
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    background: #fff;
    box-shadow: 4px 9px 20px -12px ${(props) => props.$color};
  }
  select:focus {
    outline: none;
  }
`;
