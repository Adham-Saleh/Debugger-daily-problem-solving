import view from "./view.js";

export default class SectionView extends view {
  addHandlerOpenSection(parent = this._parentElement) {
    parent.addEventListener("click", function (e) {
      const closeBtn = e.target.closest(".down-arrow--btn");
      const section = parent.lastElementChild.lastElementChild;
      closeBtn.classList.toggle("arrw-btn-animation");
      section.classList.toggle("hidden");
    });
  }
}
