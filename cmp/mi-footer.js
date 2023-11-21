class MiFooter
extends HTMLElement{
    connectedCallBack(){
        this.innerHTML = /*html*/
        `<p>
        &copy; 2023
        Salazar Mendieta Jesus Angel.
      </p>`;
    }
}

customElements.define(
    "mi-footer", MiFooter);