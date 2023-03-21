let getUserRepos = function (user) {
  let apiUrl = "https://api.github.com/users/" + user + "/repos";

  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      displayRepos(data, user);
    });
  });
};

const userFormEl = document.querySelector("#user-form");
const nameInputEl = document.querySelector("#username");
const repoContainerEl = document.querySelector("#repos-container");
const repoSearchTerm = document.querySelector("#repo-search-term");

const formsubmitHandler = (event) => {
  event.preventDefault();

  // get value form input element
  const username = nameInputEl.value.trim();
  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("No a valid username!");
  }
};

const displayRepos = (repos, searchTerm) => {
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  for (let i = 0; i < repos.length; i++) {
    // format the repo name
    let repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a container for each repo
    let repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between";

    // create a span element to hold repository nane
    let titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    // create staus element
    let statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if the current repo has issues
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        repos[i].open_issues_count +
        " issue(s)";
    } else {
      statusEl.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // appened to the dom
    repoEl.appendChild(statusEl);
    repoContainerEl.appendChild(repoEl);
}
  }
userFormEl.addEventListener("submit", formsubmitHandler);
