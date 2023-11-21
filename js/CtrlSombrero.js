import {
    getAuth,
    getFirestore
  } from "../lib/fabrica.js";
  import {
    getString,
    muestraError
  } from "../lib/util.js";
  import {
    muestraAlumnos
  } from "./navegacion.js";
  import {
    tieneRol
  } from "./seguridad.js";
  
  const daoSombrero=
    getFirestore().
      collection("Alumno");
  const params =
    new URL(location.href).
      searchParams;
  const id = params.get("id");
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
      busca();
    }
  }
  
  /** Busca y muestra los datos que
   * corresponden al id recibido. */
  async function busca() {
    try {
      const doc =
        await daoSombrero.
          doc(id).
          get();
      if (doc.exists) {
        /**
         * @type {
            import("./tipos.js").
                    Alumno} */
        const data = doc.data();
        forma.color.value = data.color;
        forma.tipo.value = data.tipo || "";
        forma.precio.value = data.precio || "";
        forma.talla.value = data.talla || "";
        forma.fecha.value = data.fecha || "";
        forma.addEventListener(
          "submit", guarda);
        forma.eliminar.
          addEventListener(
            "click", elimina);
      } else {
        throw new Error(
          "No se encontró.");
      }
    } catch (e) {
      muestraError(e);
      muestraSombreros();
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
                  Alumno} */
      const modelo = {
        color, 
        tipo,
        precio,
        talla,
        fecha
      };
      await daoSombrero.
        doc(id).
        set(modelo);
      muestraSombreros();
    } catch (e) {
      muestraError(e);
    }
  }
  
  async function elimina() {
    try {
      if (confirm("Confirmar la " +
        "eliminación")) {
        await daoSombrero.
          doc(id).
          delete();
        muestraSombreros();
      }
    } catch (e) {
      muestraError(e);
    }
  }
  
  