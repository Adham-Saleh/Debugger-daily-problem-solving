import View from "./view.js";

class ProblemGeneratorView extends View {
  _parentElement = document.querySelector(".problem-details");

  viewGeneratedProblem(problem) {
    const problemLink = `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`;
    const markup = `
              <li>Rate: ${problem.rating}</li>
              <li>Title: ${problem.index}. ${problem.name}</li>
              <li>Tags: ${problem.tags.join(", ")}</li>
              <li>Problem link: <span class="problem-link"><a href=${problemLink}>${problemLink}</a><span></li>
              `;
    this._clear();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }
}

export default new ProblemGeneratorView();
