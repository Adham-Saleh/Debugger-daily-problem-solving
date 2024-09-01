import View from "./view.js";

class SignupView extends View {
  _parentElement = document.querySelector(".sign__up");
  _countryWindow = document.querySelector(".country");
  _signinForm = document.querySelector(".sign__in");
  _error = "Handler Not found!";
  _message = "Account created successfully";

  constructor() {
    super();
    this.addHandlerSignup();
    this.addHandlerOpenSigninForm();
  }

  _generateCountriesMarkup(country) {
    return `<option value="${country}" name="country">${country}</option>`;
  }

  viewCountries(countries) {
    const selectOptions = countries
      .map((country) => this._generateCountriesMarkup(country))
      .join("");
    this._countryWindow.insertAdjacentHTML("beforeend", selectOptions);
  }

  addHandlerSignup(subs) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const userData = [...new FormData(this)];
      const data = Object.fromEntries(userData);
      const inputFields = Array.from(this.querySelectorAll("input"));
      subs(data);
      inputFields.forEach((field) => (field.value = ""));
    });
  }

  // getFirstChild() {
  //   return this._parentElement.firstElementChild;
  // }

  addHandlerOpenSigninForm() {
    this._parentElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("sign-up__btn")) {
        this._signinForm.classList.toggle("hidden");
        this._parentElement.classList.toggle("hidden");
      }
    });
  }
}

export default new SignupView();
