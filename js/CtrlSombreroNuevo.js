import {
    getAuth,
    getFirestore
  } from "../lib/fabrica.js";
  import {
    getString,
    muestraError
  } from "../lib/util.js";
  import {
    muestraSombreros
  } from "./navegacion.js";
  import {
    tieneRol
  } from "./seguridad.js";
  
  const daoSombrero =
    getFirestore().
      collection("Sombrero");
  /** @type {HTMLFormElement} */
  const forma = document["forma"];
  getAuth().onAuthStateChanged(
    protege, muestraError);
  
  /** @param {import(
      "../lib/tiposFire.js").User}
      usuario */
  async function protege(usuario) {
    if (tieneRol(usuario,
      ["Administrador"])) {
      forma.addEventListener(
        "submit", guarda);
    }
  }
  
  /** @param {Event} evt */
  async function guarda(evt) {
    try {
      evt.preventDefault();
      const formData =
        new FormData(forma);
      const color = getString(
          formData, "color").trim();  
      const tipo = getString(formData, "tipo").trim();
      const precio = getString(formData, "precio").trim();
      const talla = getString(formData, "talla").trim();
      const fecha = getString(formData, "fecha").trim();
      /**
       * @type {
          import("./tipos.js").
                  Sombrero} */
      const modelo = {
        color,
        tipo,
        precio,
        talla,
        fecha 
      };
      await daoSombrero.
        add(modelo);
      muestraSombreros();
    } catch (e) {
      muestraError(e);
    }
  }
  
  
