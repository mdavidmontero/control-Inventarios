import { useForm } from "react-hook-form";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import { InputText } from "./InputText";
import { Btnsave } from "../../molecules/BtnSave";
import { useInventariosPuntosStore } from "../../../store/InventarioPuntosStore";
import { ContainerSelector } from "../../atoms/ContainerSelector";
import { Selector } from "../Selector";
import { ListaGenerica } from "../../molecules/ListaGenerica";
import { useState } from "react";
import { BtnFilter } from "../../molecules/BtnFilter";
import { useProductsStore } from "../../../store/ProductsStore";
import { usePuntosStore } from "../../../store/PuntosStore";
import { CardProductSelect } from "../../molecules/CardProductSelect";

export function RegisterInventarioPunto({ onClose, dataSelect, accion }) {
  const { insertInventarioPuntos, updateInventarioPuntos } =
    useInventariosPuntosStore();
  const { selectproducts, dataproductos, productosItemSelect } =
    useProductsStore();
  const { selectPuntos, dataPuntos, puntosItemSelect } = usePuntosStore();

  const [stateProductPunto, setStateProductPunto] = useState(false);
  const [statePunto, setStatePunto] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  async function insertar(data) {
    const payload = {
      _id_producto: productosItemSelect?.id,
      _id_punto: puntosItemSelect?.id,
      _stock: parseFloat(data.stock),
    };

    if (!payload._id_producto || !payload._id_punto) {
      alert("Debe seleccionar un producto y un punto antes de guardar.");
      return;
    }

    if (accion === "Editar") {
      await updateInventarioPuntos({ id: dataSelect.id, ...payload });
    } else {
      await insertInventarioPuntos(payload);
    }
    onClose();
  }

  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              {accion === "Editar" ? "Editar Punto" : "Registrar Nuevo Punto"}
            </h1>
          </section>
          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section>
            <ContainerSelector>
              <label>Productos: </label>
              <Selector
                funcion={() => setStateProductPunto(!stateProductPunto)}
                state={stateProductPunto}
                color="#fc6027"
                texto1="🍿"
                texto2={
                  productosItemSelect?.descripcion || "Seleccionar producto"
                }
              />
              {stateProductPunto && (
                <ListaGenerica
                  setState={() => setStateProductPunto(false)}
                  bottom="-260px"
                  scroll="scroll"
                  data={dataproductos}
                  funcion={selectproducts}
                />
              )}
              <BtnFilter
                bgcolor="#f6f3f3"
                textcolor="#353535"
                icono={<v.agregar />}
              />
            </ContainerSelector>
            <CardProductSelect
              text1={productosItemSelect.descripcion}
              text2={productosItemSelect.stock}
            />
            <ContainerSelector>
              <label>Punto: </label>
              <Selector
                funcion={() => setStatePunto(!statePunto)}
                state={statePunto}
                color="#fc6027"
                texto1="📍"
                texto2={puntosItemSelect?.nombre || "Seleccionar punto"}
              />
              {statePunto && (
                <ListaGenerica
                  setState={() => setStatePunto(false)}
                  bottom="-260px"
                  scroll="scroll"
                  data={dataPuntos}
                  funcion={selectPuntos}
                />
              )}
              <BtnFilter bgcolor="#f6f3f3" textcolor="#353535" />
            </ContainerSelector>

            <InputText icono={<v.iconocategorias />}>
              <input
                className="form__field"
                defaultValue={dataSelect?.stock || ""}
                type="text"
                placeholder=""
                {...register("stock", {
                  required: true,
                })}
              />
              <label className="form__label">Stock</label>
              {errors.stock && <p>{errors.stock.message}</p>}
            </InputText>

            {/* Botón Guardar */}
            <div className="btnguardarContent">
              <Btnsave
                icono={<v.iconoguardar />}
                titulo="Guardar"
                bgcolor="#ef552b"
              />
            </div>
          </section>
        </form>
      </div>
    </Container>
  );
}

const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .form__field {
    color: ${({ theme }) => theme.text};
  }

  .sub-contenedor {
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }

    .formulario {
      section {
        gap: 20px;
        display: flex;
        flex-direction: column;

        .colorContainer {
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
    }
  }
`;
