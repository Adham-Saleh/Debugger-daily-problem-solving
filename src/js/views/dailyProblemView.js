import sectionsView from "./sectionsView.js";

class DailyProblem extends sectionsView {
  _parentElement = document.querySelector(".daily-problem--section");
  _error = "Wrong Answer!";
  _message = "Answer submited successfully";

  constructor() {
    super();
    this.addHandlerOpenSection();
  }

  addHandlerGo(subs) {
    this._parentElement.addEventListener("click", function (e) {
      const goBtn = e.target.closest(".go-btn");
      if (goBtn) {
        const problem = subs();
        const problemLink = `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`;
        window.location.href = problemLink;
      }
    });
  }

  addHandlerSubmit(subs) {
    this._parentElement.addEventListener("click", function (e) {
      const submitBtn = e.target.closest(".submit-btn");
      if (submitBtn) subs();
    });
  }

  afterUserSubmission() {
    const submitBtn =
      this._parentElement.lastElementChild.lastElementChild.lastElementChild.lastElementChild;
    submitBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg> submitted`
  }
}

export default new DailyProblem();
