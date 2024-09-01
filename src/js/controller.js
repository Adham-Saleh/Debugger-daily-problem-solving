import * as model from "./model.js";
import NavbarView from "./views/navbarView.js";
import NavMenuView from "./views/navMenuView.js";
import ProblemGeneratorView from "./views/problemGenratorView.js";
import signupView from "./views/signupView.js";
import signinView from "./views/signinView.js";
import signoutView from "./views/signoutView.js";
import dailyProblemView from "./views/dailyProblemView.js";
import sectionsView from "./views/sectionsView.js";
import dashboardView from "./views/dashboardView.js";
import howToUseView from "./views/howToUseView.js";

const controlGeneratingProblem = async function () {
  ProblemGeneratorView.renderSpinner();
  await model.generateProblem();
  const { problem: currentProblem } = await model.getCurrentProblem();
  ProblemGeneratorView.viewGeneratedProblem(currentProblem);
};

const controlSignUpCountries = async function () {
  const countries = await model.generateSignUpCountries();
  signupView.viewCountries(countries);
};

const controlSignUpData = async function (data) {
  try {
    await model.createUser(data);
    signupView.renderMsg();
  } catch (err) {
    console.log(err);
    signupView.renderMsg(true, err.message);
  }
};

const controlSinginData = async function (data) {
  try {
    const userData = await model.signin(data);
    signinView.renderMsg();
    signinView.manageUserSignin(userData);
  } catch (err) {
    signinView.renderMsg(true);
  }
};

const controlOnLoadSignIn = function () {
  if (model.checkUserExist()) return model.checkUserExist();
};

const controlSignOut = function () {
  model.signout();
  location.reload();
};

const controlGoBtn = function () {
  return model.goBtn();
};

const controlSubmitBtn = async function () {
  try {
    dashboardView.renderSpinner();
    const data = await model.submit();
    const problemLink = model.getProblemLink();
    dashboardView.generateTableMarkup(data, problemLink);
    dailyProblemView.renderMsg();
    dailyProblemView.afterUserSubmission();
  } catch (err) {
    controlViewExistingSubmissions();
    dailyProblemView.renderMsg(true, err.message);
  }
};

const controlViewExistingSubmissions = async function () {
  try {
    dashboardView.renderSpinner();
    const usersSubmissions = await model.checkSubmissionsExist();
    const problemLink = model.getProblemLink();
    if (!(usersSubmissions.length > 0)) throw new Error("No submissions yet");
    dashboardView.addHandlerLoadSubmissions(usersSubmissions, problemLink);
    dailyProblemView.afterUserSubmission()
  } catch (err) {
    dashboardView.userFreindlyMessage();
  }
};

const init = function () {
  controlGeneratingProblem();
  controlSignUpCountries();
  controlViewExistingSubmissions();
  signupView.addHandlerSignup(controlSignUpData);
  signinView.addHandlerSignin(controlSinginData);
  signinView.addOnLoadSignIn(controlOnLoadSignIn);
  signoutView.addHandlerSignOut(controlSignOut);
  dailyProblemView.addHandlerGo(controlGoBtn);
  dailyProblemView.addHandlerSubmit(controlSubmitBtn);
  model.checkDayPassed();
};
init();
