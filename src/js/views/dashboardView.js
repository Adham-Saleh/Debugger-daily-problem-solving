import sectionsView from "./sectionsView.js";

class DashboardView extends sectionsView {
  _parentElement = document.querySelector(".dashboard--content");
  _message = "No submissions yet";

  constructor() {
    super();
    this.addHandlerOpenSection(this._parentElement.parentElement.parentElement);
  }

  // make submissions appear on load
  addHandlerLoadSubmissions(data, problemLink) {
    if (!(data.length > 0)) return;
    this.generateTableMarkup(data, problemLink);
  }

  generateTableMarkup(data, problemLink) {
    const markup = `
                <table>
                    <th>No.</th>
                    <th>username</th>
                    <th>problem</th>
                    <th>time</th>
                    ${this._generateRowTableMarkup(data, problemLink)}
                </table>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _generateRowTableMarkup(data, problemLink) {
    return data
      .map(function (row, idx) {
        return `
            <tr>
            <td>${idx + 1}.</td>
            <td>${row.username}</td>
            <td><a href="${problemLink}">${row.problem}</a></td>
            <td>${row.time}ms</td>
            </tr>`;
      })
      .join("");
  }
}

export default new DashboardView();
