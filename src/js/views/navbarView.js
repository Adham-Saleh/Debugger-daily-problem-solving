import Navbar from "./navParent.js";

class NavbarView extends Navbar {
  _parentElement = document.querySelector(".nav--content");
  _error = "";

  constructor() {
    super();
    this._openCloseNavBtn();
  }

  _openCloseNavBtn() {
    this._parentElement.addEventListener("click", (e) => {
      const openBtn = e.target.closest(".menu-btn");
      const closeBtn = e.target.closest(".menu-close-btn");

      if (openBtn) this._openCloseNav("block");
      if (closeBtn) this._openCloseNav("none");
    });
  }
}

export default new NavbarView();
