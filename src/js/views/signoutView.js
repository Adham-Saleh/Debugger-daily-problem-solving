import { doc } from "firebase/firestore";
import View from "./view.js";

class SignoutView extends View {
  _parentElement = document.querySelector(".sign-btns");
  _error = "";
  _message = "signed out successfully";

  addHandlerSignOut = function (subs) {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.classList.contains("sign-out")) subs();
    });
  };
}
export default new SignoutView();
