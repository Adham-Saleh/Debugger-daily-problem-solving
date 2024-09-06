import { getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";
import { colRef, docRef, getPrevDay, currentProblem, db } from "./database.js";
import { CODEFORCES_API, COUNTRIES_API } from "./config.js";
//timeout promise
const timeout = async function (sec) {
  new Promise(function (_, reject) {
    setTimeout(function () {
      throw new Error("request timeout");
    }, sec * 1000);
  });
};

// generating random codeforces problem

const generateRandomIndex = function (problemsLength) {
  return Math.trunc(Math.random() * problemsLength + 1);
};

export const checkDayPassed = async function () {
  const prevDay = await getDocs(getPrevDay);
  const { day } = prevDay.docs[0].data();
  return day;
};

const resetSubmissions = async function () {
  const submissions = await getDocs(docRef);
  submissions.docs.forEach(function (submessions) {
    deleteDoc(doc(db, "submissions", submessions.id));
  });
};

const resetDay = async function (curDay, prvDay) {
  const allDays = await getDocs(getPrevDay);
  addDoc(getPrevDay, { day: curDay });
  allDays.docs.forEach(function (day) {
    if (day.data().day === prvDay) {
      deleteDoc(doc(db, "newDay", day.id));
    }
  });
};

export const generateProblem = async function () {
  const date = new Date();
  const curDay = date.getDate();
  const prvDay = await checkDayPassed();
  if (curDay - prvDay === 1) {
    try {
      const codeforces = await fetch(`${CODEFORCES_API}problemset.problems`);
      if (!codeforces.ok) throw new Error("Check connection");
      const allproblems = await codeforces.json();
      const { problems } = allproblems.result;
      const ratedProblems = problems.filter(function (problem) {
        return problem.rating >= 800 && problem.rating <= 1000;
      });
      const randomIdx = generateRandomIndex(ratedProblems.length);
      const problem = ratedProblems.at(randomIdx);
      localStorage.setItem("problem", JSON.stringify(problem));
      resetDay(curDay, prvDay);
      addDoc(currentProblem, { problem });
      const curPrvProblem = await getDocs(currentProblem);
      curPrvProblem.docs.forEach(function (problems) {
        if (problems.data().problem.name !== problem.name) {
          deleteDoc(doc(db, "dailyProblem", problems.id));
        }
      });
      resetSubmissions();
    } catch (err) {
      console.log(err);
      throw err;
    }
  } else {
    const currentProblem = localStorage.getItem("problem");
    return JSON.parse(currentProblem);
  }
};

export const getCurrentProblem = async function () {
  const curPrvProblem = await getDocs(currentProblem);
  localStorage.setItem("problem", JSON.stringify(curPrvProblem.docs[0].data()));
  return curPrvProblem.docs[0].data();
};

const checkCodeforcesHandler = async function (username) {
  try {
    const codeforces = await fetch(
      ` ${CODEFORCES_API}user.info?handles=${username}&checkHistoricHandles=false`
    );
    if (!codeforces.ok) return false;
    return true;
  } catch (err) {
    throw err;
  }
};

const userAccountExists = async function (username) {
  const users = await getDocs(colRef);
  for (const user of users.docs) {
    console.log(user.data().username, username);
    if (username === user.data().username) return true;
  }
  return false;
};

export const createUser = async function (userData) {
  try {
    if (await userAccountExists(userData.username))
      throw new Error("user already exists");
    const checkUserHandler = await checkCodeforcesHandler(userData.username);
    if (checkUserHandler) {
      addDoc(colRef, userData);
    } else {
      throw new Error("Handler not found!");
    }
  } catch (err) {
    throw err;
  }
};

export const generateSignUpCountries = async function () {
  try {
    const api = await fetch(`${COUNTRIES_API}?fields=name`);
    const data = await api.json();
    const countries = data
      .map((country) => country.name.common)
      .filter((country) => country !== "Israel");
    return countries;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const checkUserExist = function () {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return false;
};

export const signin = async function (userData) {
  try {
    const userExist = checkUserExist();
    if (userExist) return userExist;

    const users = await getDocs(colRef);
    for (const user of users.docs) {
      const { username, password } = user.data();
      if (username === userData.username && password === userData.password) {
        localStorage.setItem("user", JSON.stringify(user.data()));
        return user.data();
      }
    }
    throw new Error("Invaild Cardinals");
  } catch (err) {
    throw err;
  }
};

export const signout = function () {
  localStorage.removeItem("user");
};

export const goBtn = function () {
  const problem = localStorage.getItem("problem");
  return JSON.parse(problem);
};

const checkUserSubmit = async function (username, problemName) {
  const userStatus = await fetch(
    `${CODEFORCES_API}user.status?handle=${username}&from=1&count=10`
  );
  const { result } = await userStatus.json();
  const [problem] = result.filter(function (problem) {
    return problem.problem.name === problemName;
  });
  if (problem?.verdict === "OK") return problem;
  return false;
};

const updateDashboard = async function () {
  const submissions = await getDocs(docRef);
  const usersSubmissions = submissions.docs
    .map((submission) => submission.data())
    .sort((a, b) => a.time - b.time);
  return usersSubmissions;
};

const storeSubmission = async function (user, problem) {
  try {
    const existingSubmissions = await updateDashboard();
    for (const submission of existingSubmissions) {
      console.log(submission);
      if (user.username === submission.username)
        throw new Error("Problem already submitted");
    }
    const submissionData = {
      username: user.username,
      problem: problem.problem.name,
      time: problem.timeConsumedMillis,
    };
    addDoc(docRef, submissionData);
  } catch (err) {
    throw err;
  }
};

export const getProblemLink = function () {
  const { problem } = JSON.parse(localStorage.getItem("problem"));
  return `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`;
};

export const submit = async function () {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const { problem } = JSON.parse(localStorage.getItem("problem"));
    if (!user) throw new Error("sign in to submit");
    const userSolved = await checkUserSubmit(user.username, problem.name);
    const correctStatus = await userSolved;
    if (!correctStatus) throw new Error("Wrong Answer");
    await storeSubmission(user, correctStatus);
    return updateDashboard();
  } catch (err) {
    throw err;
  }
};

export const checkSubmissionsExist = async function () {
  const submissions = updateDashboard();
  const usersSubmissions = await submissions;
  if (!(usersSubmissions.length > 0)) return false;
  return usersSubmissions;
};
