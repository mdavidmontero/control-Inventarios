import { useForm } from "react-hook-form";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import { InputText } from "./InputText";
import { Btnsave } from "../../molecules/BtnSave";
import { useCompanyStore } from "../../../store/companyStore";
import { Buscador } from "../Buscador";
import { useState } from "react";
import { ListaGenerica } from "../../molecules/ListaGenerica";
import { useProductsStore } from "../../../store/ProductsStore";
import { CardProductSelect } from "../../molecules/CardProductSelect";
import { useUsersStore } from "../../../store/UsersStore";
import { useQueryClient } from "@tanstack/react-query";
import { useKardexPuntoStore } from "../../../store/KardexPuntoStore";
import { usePuntosStore } from "../../../store/PuntosStore";
import { ContainerSelector } from "../../atoms/ContainerSelector";
import { Selector } from "../Selector";
import { BtnFilter } from "../../molecules/BtnFilter";
export function RegisterKardexPunto({ onClose, dataSelect, tipo }) {
  const [statePunto, setStatePunto] = useState(false);
  const insertKardexPunto = useKardexPuntoStore(
    (state) => state.insertKardexPunto
  );
  const idUsuario = useUsersStore((state) => state.idUsuario);
  const [stateListaProd, SetstateListaProd] = useState(false);
  const dataproductosPunto = useProductsStore(
    (state) => state.dataproductosPunto
  );
  const selectproductsPunto = useProductsStore(
    (state) => state.selectproductsPunto
  );
  const productosItemSelectPunto = useProductsStore(
    (state) => state.productosItemSelectPunto
  );
  const dataPuntos = usePuntosStore((state) => state.dataPuntos);
  const selectPuntos = usePuntosStore((state) => state.selectPuntos);
  const puntosItemSelect = usePuntosStore((state) => state.puntosItemSelect);
  const setItemSelect = useProductsStore((state) => state.setItemSelect);
  const setBuscador = useProductsStore((state) => state.setBuscador);
  const query = useQueryClient();
  const { dataCompany } = useCompanyStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function insertar(data) {
    const p = {
      fecha: new Date(),
      tipo: tipo,
      id_usuario: idUsuario,
      id_producto: productosItemSelectPunto.id_producto,
      cantidad: parseFloat(data.cantidad),
      detalle: data.detalle,
      id_empresa: dataCompany.id,
      id_punto: puntosItemSelect.id,
    };
    await insertKardexPunto(p);
    query.invalidateQueries(["mostrar productos"]);
    setItemSelect([]);
    onClose();
  }
  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>Nuevo {tipo == "entrada" ? "Entrada" : "salida"}</h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>
        <div className="contentBuscador">
          <div onClick={() => SetstateListaProd(!stateListaProd)}>
            <Buscador setBuscador={setBuscador} />
          </div>
          {stateListaProd && (
            <ListaGenerica
              bottom="-250px"
              scroll="scroll"
              data={dataproductosPunto}
              setState={() => SetstateListaProd(!stateListaProd)}
              funcion={selectproductsPunto}
            />
          )}
        </div>
        <CardProductSelect
          text1={productosItemSelectPunto.descripcion}
          text2={productosItemSelectPunto.stock}
          text3={productosItemSelectPunto?.punto_nombre}
        />

        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section>
            <article>
              <InputText icono={<v.iconomarca />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.descripcion}
                  type="text"
                  placeholder=""
                  {...register("cantidad", {
                    required: true,
                  })}
                />
                <label className="form__label">Cantidad</label>
                {errors.cantidad?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

            <article>
              <ContainerSelector>
                <label>Puntos: </label>
                <Selector
                  funcion={() => setStatePunto(!statePunto)}
                  state={statePunto}
                  color="#fc6027"
                  texto1="🍿"
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
                <BtnFilter
                  bgcolor="#f6f3f3"
                  textcolor="#353535"
                  icono={<v.agregar />}
                />
              </ContainerSelector>
            </article>

            <article>
              <InputText icono={<v.iconomarca />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.descripcion}
                  type="text"
                  placeholder=""
                  {...register("detalle", {
                    required: true,
                  })}
                />
                <label className="form__label">Motivo</label>
                {errors.detalle?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

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
    .contentBuscador {
      position: relative;
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
