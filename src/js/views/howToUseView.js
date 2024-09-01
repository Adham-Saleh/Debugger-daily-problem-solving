import sectionsView from "./sectionsView.js";

class HowToUseView extends sectionsView {
  _parentElement = document.querySelector(".howtouse--section");

  _signinForm = document.querySelector(".sign__in");
  _signupForm = document.querySelector(".sign__up");
  _overlay = document.querySelector(".overlay");
  _navBar = document.querySelector(".nav--content");

  constructor() {
    super();
    this.addHandlerOpenSection();
    this.addHandlerSignBtns();
  }

  addHandlerSignBtns() {
    this._parentElement.addEventListener("click", (e) => {
      const targetBtn = e.target.classList.contains("main-link");
      if (!targetBtn) return;
      this._overlay.style.display = "block";
      this._navBar.scrollIntoView({ behavior: "smooth" });
      if (e.target.innerHTML.includes("up")) {
        this._signupForm.classList.toggle("hidden");
        this._signinForm.classList.add("hidden");
      }
      if (e.target.innerHTML.includes("in")) {
        this._signinForm.classList.toggle("hidden");
        this._signupForm.classList.add("hidden");
      }
    });
  }
}

export default new HowToUseView();
