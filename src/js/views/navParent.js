import View from "./view.js";

export default class Navbar extends View {
  _window = document.querySelector(".nav-menu");
  _menuOpenBtn = document.querySelector(".menu-btn");
  _menuCloseBtn = document.querySelector(".menu-close-btn");

  _openCloseNav(display) {
    this._window.style.display = display;
    this._menuCloseBtn.classList.toggle("hidden");
    this._menuOpenBtn.classList.toggle("hidden");
  }
}
