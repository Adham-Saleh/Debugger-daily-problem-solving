import { doc } from "firebase/firestore";
import Navbar from "./navParent.js";

class NavMenuView extends Navbar {
  _parentElement = document.querySelector(".nav-menu");
  _signUpBtns = document.querySelector(".sign-btns");
  _signupForm = document.querySelector(".sign__up ");
  _signinForm = document.querySelector(".sign__in");
  _overlay = document.querySelector(".overlay");

  constructor() {
    super();
    this.openSignForms();
    this.hideForms();
    this.addHandlerMenuOptions();
  }
  openSignForms() {
    this._signUpBtns.addEventListener("click", (e) => {
      if (e.target.classList.contains("sign-up")) {
        this._openCloseNav("none");
        this._signinForm.classList.add("hidden");
        this._signupForm.classList.remove("hidden");
      }
      if (e.target.classList.contains("sign-in")) {
        this._openCloseNav("none");
        this._signupForm.classList.add("hidden");
        this._signinForm.classList.remove("hidden");
      }
      this._overlay.style.display = "block";
    });
  }
  hideForms() {
    this._overlay.addEventListener("click", () => {
      this._overlay.style.display = "none";

      this._signinForm.firstElementChild.classList.contains("message")
        ? this._signinForm.removeChild(document.querySelector(".message"))
        : "";
      this._signupForm.firstElementChild.classList.contains("message")
        ? this._signupForm.removeChild(document.querySelector(".message"))
        : "";
      this._signupForm.classList.add("hidden");
      this._signinForm.classList.add("hidden");
    });
  }

  addHandlerMenuOptions() {
    this._parentElement.addEventListener("click", (e) => {
      if (!e.target.href) return;
      this._openCloseNav();
      this._parentElement.style.display = "none";
      const goToSection = document.querySelector(
        `.${e.target.dataset.section}`
      );
      goToSection.scrollIntoView({ behavior: "smooth" });
      const lastChild = goToSection.lastElementChild.lastElementChild;
      lastChild.style.boxShadow = "1px 1px 10px white";
      setTimeout(function () {
        lastChild.style.boxShadow = "none";
      }, 1000);
    });
  }
}

export default new NavMenuView();
