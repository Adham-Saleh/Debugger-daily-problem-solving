import View from "./view.js";

class SigninView extends View {
  _parentElement = document.querySelector(".sign__in");
  _signupForm = document.querySelector(".sign__up");
  _overlay = document.querySelector(".overlay");
  _error = "Invaild Cardinals!";
  _message = "Singed in successfully";

  constructor() {
    super();
    this.addHandlerSignin();
    this.addHandlerOpenSignupForm();
  }

  addOnLoadSignIn(subs) {
    if (subs())
      window.addEventListener("load", () => {
        this.manageUserSignin(subs());
      });
  }

  addHandlerSignin(subs) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const userData = [...new FormData(this)];
      const data = Object.fromEntries(userData);
      const inputFields = Array.from(this.querySelectorAll("input"));
      subs(data);
      inputFields.forEach((field) => (field.value = ""));
    });
  }

  manageUserSignin(userData) {
    const btns = document.querySelector(".sign-btns");
    btns.innerHTML = "";
    const markup = `
    <li class="usernameInfo">
      <a href="#">${userData.username}</a>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
      </svg>
    </li>
    <button class="sign-out">sing-out</button>
    `;
    btns.insertAdjacentHTML("afterbegin", markup);
    setTimeout(() => this.hideSignIn(), 750);
  }

  hideSignIn() {
    this._overlay.style.display = "none";

    this._parentElement.firstElementChild.classList.contains("message")
      ? this._parentElement.removeChild(document.querySelector(".message"))
      : "";
    this._parentElement.classList.add("hidden");
  }

  addHandlerOpenSignupForm() {
    this._parentElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("sign-up__btn")) {
        this._signupForm.classList.toggle("hidden");
        this._parentElement.classList.toggle("hidden");
      }
    });
  }
}

export default new SigninView();
