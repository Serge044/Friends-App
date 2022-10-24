window.addEventListener("load", windowLoad);

function windowLoad() {
  //HTML
  const htmlBlock = document.documentElement;

  // get saved theme
  const saveUserTheme = localStorage.getItem("user-theme");

  // work with system configurations
  let userTheme;
  if (window.matchMedia) {
    userTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      !saveUserTheme ? changeTheme() : null;
    });

  // change theme by click
  const themeButton = document.querySelector(".page__theme");
  const resetButton = document.querySelector(".page__reset");
  if (themeButton) {
    themeButton.addEventListener("click", function (e) {
      resetButton.classList.add("active");
      changeTheme(true);
    });
  }
  if (resetButton) {
    resetButton.addEventListener("click", function (e) {
      resetButton.classList.remove("active");
      localStorage.setItem("user-theme", "");
    });
  }

  // function add theme class
  function setThemeClass() {
    if (saveUserTheme) {
      htmlBlock.classList.add(saveUserTheme);
      resetButton.classList.add("active");
    } else {
      htmlBlock.classList.add(userTheme);
    }
  }
  // add theme class
  setThemeClass();

  // function change theme
  function changeTheme(saveTheme = false) {
    let currentTheme = htmlBlock.classList.contains("light") ? "light" : "dark";
    let newTheme;

    if (currentTheme === "light") {
      newTheme = "dark";
    } else if (currentTheme === "dark") {
      newTheme = "light";
    }
    htmlBlock.classList.remove(currentTheme);
    htmlBlock.classList.add(newTheme);
    saveTheme ? localStorage.setItem("user-theme", newTheme) : null;
  }
}

// loader

const loaderDiv = document.getElementById("loader");

function showLoader() {
  loaderDiv.classList.add("show");
}

function hideLoader() {
  loaderDiv.classList.remove("show");
}

// sort by name

const quoteInputElement = document.getElementById("nameInput");

// create request with ability change the number of how many cards load(in Progress)
// work with "-" values
// make this feature a popup element after on click

// const howManyCardsLoad = 50;

function howMany() {
  let howManyLoad = `
  <div class="bullet-sort">
  <p class="icons"> How-many-cards-load?(0 - 5000) </p>
  <input id="howManyInput" class="how-many-input" type="number" min="1" max="5000" value="5" autofocus></input>
  <button id="get-input" class="btn_sort">Get value</button>
  </div>
  `;

  document.getElementById("howManyCardsLoad").innerHTML = howManyLoad;
}

howMany();

document.getElementById("get-input").onclick = function () {
  const input = document.getElementById("howManyInput");
  let returnFromInput = Math.floor(input.value);
  console.log(returnFromInput);
  mainProcess(returnFromInput);
};

// add restriction to enter only numbers
// make other filters (perhaps country?)
// add the default number to the input (for example, to load 10 cards)

document.getElementById("get-input").onclick = function () {
  const input = document.getElementById("howManyInput");
  let returnFromInput = Math.floor(input.value);
  console.log(returnFromInput);
  mainProcess(returnFromInput);
};

// if btn "two" was clicked(make it one function with cycle)

document.getElementById("two").onclick = function () {
  let returnFromInput = 2;
  console.log(returnFromInput);
  mainProcess(returnFromInput);
};

// if btn "five" was clicked

document.getElementById("five").onclick = function () {
  let returnFromInput = 5;
  console.log(returnFromInput);
  mainProcess(returnFromInput);
};

// if btn "ten" was clicked

document.getElementById("ten").onclick = function () {
  let returnFromInput = 10;
  console.log(returnFromInput);
  mainProcess(returnFromInput);
};

// render cards

function mainProcess(returnFromInput) {
  showLoader();
  fetch(`https://randomuser.me/api/?results=${returnFromInput}`)
    .then((res) => res.json())
    .then((data) => {
      hideLoader();
      let cards = data.results;
      const originalArr = Object.assign([], cards);
      // console.log(originalArr);

      let result = "";

      cards.forEach(function (lists) {
        result += `
                <div>
                    <div class="friend-card">
                    <div class="card-top">
                    <div><img src="${lists.picture.large}"></div>
                    <div class="bullet">
                    <div id="name"> ${lists.name.first} ${lists.name.last}</div>
                    <div>${lists.gender}</div>
                    </div>
                    </div>

                    <div class="card-bottom">

                    <div class="bullet">
                    <p class="icons"> age-image: </p>
                    <div id="age">${lists.dob.age}</div>
                    </div>

                    <div class="bullet">
                    <p class="icons"> location-image: </p>
                    <div id="location">${lists.location.city}, ${lists.location.country}</div>
                    </div>

                    <div class="bullet">
                    <p class="icons"> phone-image: </p>
                    <div id="phone">${lists.cell}</div>
                    </div>

                    <div class="bullet">
                    <p class="icons"> email-image: </p>
                    <div>${lists.email}</div>
                    </div>

                    </div>
                    </div>
                </div> `;
      });

      document.getElementById("result").innerHTML = result;

      document
        .getElementById("btn-sort-0-99")
        .addEventListener("click", sort_0_99);

      document
        .getElementById("btn-sort-99-0")
        .addEventListener("click", sort_99_0);

      document
        .getElementById("btn-reset")
        .addEventListener("click", returnNotSortedArr);

      document.getElementById("sex-all").addEventListener("click", sexAll);

      document.getElementById("sex-m").addEventListener("click", sort_sex_m);

      document.getElementById("sex-w").addEventListener("click", sort_sex_w);

      document.getElementById("az").addEventListener("click", sort_name_az);

      document.getElementById("za").addEventListener("click", sort_name_za);

      document
        .getElementById("findByName")
        .addEventListener("keyup", searchByName);

      function sort_0_99() {
        let cardsSortedAgeMinMax = cards;
        cardsSortedAgeMinMax.sort((a, b) => a.dob.age - b.dob.age);

        let result = "";

        cardsSortedAgeMinMax.forEach(function (lists) {
          result += `
                  <div>
                      <div class="friend-card">
                      <div class="card-top">
                      <div><img src="${lists.picture.large}"></div>
                      <div class="bullet">
                      <div id="name"> ${lists.name.first} ${lists.name.last}</div>
                      <div>${lists.gender}</div>
                      </div>
                      </div>
  
                      <div class="card-bottom">
  
                      <div class="bullet">
                      <p class="icons"> age-image: </p>
                      <div id="age">${lists.dob.age}</div>
                      </div>
  
                      <div class="bullet">
                      <p class="icons"> location-image: </p>
                      <div id="location">${lists.location.city}, ${lists.location.country}</div>
                      </div>
  
                      <div class="bullet">
                      <p class="icons"> phone-image: </p>
                      <div id="phone">${lists.cell}</div>
                      </div>
  
                      <div class="bullet">
                      <p class="icons"> email-image: </p>
                      <div>${lists.email}</div>
                      </div>
  
                      </div>
                      </div>
                  </div> `;
        });

        document.getElementById("result").innerHTML = result;
      }

      function sort_99_0() {
        let cardsSortedAgeMinMax = cards;
        cardsSortedAgeMinMax.sort((a, b) => b.dob.age - a.dob.age);

        let result = "";

        cardsSortedAgeMinMax.forEach(function (lists) {
          result += `
                  <div>
                      <div class="friend-card">
                      <div class="card-top">
                      <div><img src="${lists.picture.large}"></div>
                      <div class="bullet">
                      <div id="name"> ${lists.name.first} ${lists.name.last}</div>
                      <div>${lists.gender}</div>
                      </div>
                      </div>
  
                      <div class="card-bottom">
  
                      <div class="bullet">
                      <p class="icons"> age-image: </p>
                      <div id="age">${lists.dob.age}</div>
                      </div>
  
                      <div class="bullet">
                      <p class="icons"> location-image: </p>
                      <div id="location">${lists.location.city}, ${lists.location.country}</div>
                      </div>
  
                      <div class="bullet">
                      <p class="icons"> phone-image: </p>
                      <div id="phone">${lists.cell}</div>
                      </div>
  
                      <div class="bullet">
                      <p class="icons"> email-image: </p>
                      <div>${lists.email}</div>
                      </div>
  
                      </div>
                      </div>
                  </div> `;
        });

        document.getElementById("result").innerHTML = result;
      }

      function sexAll() {
        let sexAll = cards;
        let result = "";

        sexAll.forEach(function (lists) {
          result += `
                  <div>
                      <div class="friend-card">
                      <div class="card-top">
                      <div><img src="${lists.picture.large}"></div>
                      <div class="bullet">
                      <div id="name"> ${lists.name.first} ${lists.name.last}</div>
                      <div>${lists.gender}</div>
                      </div>
                      </div>
  
                      <div class="card-bottom">
  
                      <div class="bullet">
                      <p class="icons"> age-image: </p>
                      <div id="age">${lists.dob.age}</div>
                      </div>
  
                      <div class="bullet">
                      <p class="icons"> location-image: </p>
                      <div id="location">${lists.location.city}, ${lists.location.country}</div>
                      </div>
  
                      <div class="bullet">
                      <p class="icons"> phone-image: </p>
                      <div id="phone">${lists.cell}</div>
                      </div>
  
                      <div class="bullet">
                      <p class="icons"> email-image: </p>
                      <div>${lists.email}</div>
                      </div>
  
                      </div>
                      </div>
                  </div> `;
        });

        document.getElementById("result").innerHTML = result;
      }

      function returnNotSortedArr() {
        let result = "";

        originalArr.forEach(function (lists) {
          result += `
                  <div>
                      <div class="friend-card">
                      <div class="card-top">
                      <div><img src="${lists.picture.large}"></div>
                      <div class="bullet">
                      <div id="name"> ${lists.name.first} ${lists.name.last}</div>
                      <div>${lists.gender}</div>
                      </div>
                      </div>
  
                      <div class="card-bottom">
  
                      <div class="bullet">
                      <p class="icons"> age-image: </p>
                      <div id="age">${lists.dob.age}</div>
                      </div>
  
                      <div class="bullet">
                      <p class="icons"> location-image: </p>
                      <div id="location">${lists.location.city}, ${lists.location.country}</div>
                      </div>
  
                      <div class="bullet">
                      <p class="icons"> phone-image: </p>
                      <div id="phone">${lists.cell}</div>
                      </div>
  
                      <div class="bullet">
                      <p class="icons"> email-image: </p>
                      <div>${lists.email}</div>
                      </div>
  
                      </div>
                      </div>
                  </div> `;
        });

        document.getElementById("result").innerHTML = result;
      }

      function sort_sex_m() {
        let cardsSortedBySex = cards;
        let cardsSortedMan = [];

        for (let i = 0; i < cardsSortedBySex.length; i++) {
          if (cardsSortedBySex[i].gender === "male") {
            cardsSortedMan.push(cardsSortedBySex[i]);
          }
        }

        let result = "";

        cardsSortedMan.forEach(function (lists) {
          result += `
                      <div>
                          <div class="friend-card">
                          <div class="card-top">
                          <div><img src="${lists.picture.large}"></div>
                          <div class="bullet">
                          <div id="name"> ${lists.name.first} ${lists.name.last}</div>
                          <div>${lists.gender}</div>
                          </div>
                          </div>
      
                          <div class="card-bottom">
      
                          <div class="bullet">
                          <p class="icons"> age-image: </p>
                          <div id="age">${lists.dob.age}</div>
                          </div>
      
                          <div class="bullet">
                          <p class="icons"> location-image: </p>
                          <div id="location">${lists.location.city}, ${lists.location.country}</div>
                          </div>
      
                          <div class="bullet">
                          <p class="icons"> phone-image: </p>
                          <div id="phone">${lists.cell}</div>
                          </div>
      
                          <div class="bullet">
                          <p class="icons"> email-image: </p>
                          <div>${lists.email}</div>
                          </div>
      
                          </div>
                          </div>
                      </div> `;
        });

        document.getElementById("result").innerHTML = result;
      }

      function sort_sex_w() {
        let cardsSortedBySex = cards;
        let cardsSortedWoman = [];

        for (let i = 0; i < cardsSortedBySex.length; i++) {
          if (cardsSortedBySex[i].gender === "female") {
            cardsSortedWoman.push(cardsSortedBySex[i]);
          }
        }

        let result = "";

        cardsSortedWoman.forEach(function (lists) {
          result += `
                      <div>
                          <div class="friend-card">
                          <div class="card-top">
                          <div><img src="${lists.picture.large}"></div>
                          <div class="bullet">
                          <div id="name"> ${lists.name.first} ${lists.name.last}</div>
                          <div>${lists.gender}</div>
                          </div>
                          </div>
      
                          <div class="card-bottom">
      
                          <div class="bullet">
                          <p class="icons"> age-image: </p>
                          <div id="age">${lists.dob.age}</div>
                          </div>
      
                          <div class="bullet">
                          <p class="icons"> location-image: </p>
                          <div id="location">${lists.location.city}, ${lists.location.country}</div>
                          </div>
      
                          <div class="bullet">
                          <p class="icons"> phone-image: </p>
                          <div id="phone">${lists.cell}</div>
                          </div>
      
                          <div class="bullet">
                          <p class="icons"> email-image: </p>
                          <div>${lists.email}</div>
                          </div>
      
                          </div>
                          </div>
                      </div> `;
        });

        document.getElementById("result").innerHTML = result;
      }

      function sort_name_az() {
        let cardsSortedByName = cards;
        cardsSortedByName.sort(function (a, b) {
          if (a.name.first < b.name.first) {
            return -1;
          }
          if (a.name.first > b.name.first) {
            return 1;
          }
          return 0;
        });

        let result = "";

        cardsSortedByName.forEach(function (lists) {
          result += `
                  <div>
                      <div class="friend-card">
                      <div class="card-top">
                      <div><img src="${lists.picture.large}"></div>
                      <div class="bullet">
                      <div id="name"> ${lists.name.first} ${lists.name.last}</div>
                      <div>${lists.gender}</div>
                      </div>
                      </div>
  
                      <div class="card-bottom">
  
                      <div class="bullet">
                      <p class="icons"> age-image: </p>
                      <div id="age">${lists.dob.age}</div>
                      </div>
  
                      <div class="bullet">
                      <p class="icons"> location-image: </p>
                      <div id="location">${lists.location.city}, ${lists.location.country}</div>
                      </div>
  
                      <div class="bullet">
                      <p class="icons"> phone-image: </p>
                      <div id="phone">${lists.cell}</div>
                      </div>
  
                      <div class="bullet">
                      <p class="icons"> email-image: </p>
                      <div>${lists.email}</div>
                      </div>
  
                      </div>
                      </div>
                  </div> `;
        });

        document.getElementById("result").innerHTML = result;
      }

      function sort_name_za() {
        let cardsSortedByName = cards;
        cardsSortedByName.sort(function (a, b) {
          if (a.name.first > b.name.first) {
            return -1;
          }
          if (a.name.first < b.name.first) {
            return 1;
          }
          return 0;
        });

        let result = "";

        cardsSortedByName.forEach(function (lists) {
          result += `
                  <div>
                      <div class="friend-card">
                      <div class="card-top">
                      <div><img src="${lists.picture.large}"></div>
                      <div class="bullet">
                      <div id="name"> ${lists.name.first} ${lists.name.last}</div>
                      <div>${lists.gender}</div>
                      </div>
                      </div>
  
                      <div class="card-bottom">
  
                      <div class="bullet">
                      <p class="icons"> age-image: </p>
                      <div id="age">${lists.dob.age}</div>
                      </div>
  
                      <div class="bullet">
                      <p class="icons"> location-image: </p>
                      <div id="location">${lists.location.city}, ${lists.location.country}</div>
                      </div>
  
                      <div class="bullet">
                      <p class="icons"> phone-image: </p>
                      <div id="phone">${lists.cell}</div>
                      </div>
  
                      <div class="bullet">
                      <p class="icons"> email-image: </p>
                      <div>${lists.email}</div>
                      </div>
  
                      </div>
                      </div>
                  </div> `;
        });

        document.getElementById("result").innerHTML = result;
      }

      function searchByName() {
        const x = document.getElementById("findByName");
        let lowerCase = x.value.toLowerCase();
        let getArr = cards;
        let sortedArr = [];
        for (let i = 0; i < getArr.length; i++) {
          let lastPlusFirst =
            getArr[i].name.first.toLowerCase() +
            " " +
            getArr[i].name.last.toLowerCase();
          if (lastPlusFirst.includes(lowerCase)) {
            console.log(lastPlusFirst);
            sortedArr.push(getArr[i]);
            console.log(getArr[i].name.first.toLowerCase());
          }

          let result = "";

          sortedArr.forEach(function (lists) {
            result += `
                      <div>
                          <div class="friend-card">
                          <div class="card-top">
                          <div><img src="${lists.picture.large}"></div>
                          <div class="bullet">
                          <div id="name"> ${lists.name.first} ${lists.name.last}</div>
                          <div>${lists.gender}</div>
                          </div>
                          </div>
      
                          <div class="card-bottom">
      
                          <div class="bullet">
                          <p class="icons"> age-image: </p>
                          <div id="age">${lists.dob.age}</div>
                          </div>
      
                          <div class="bullet">
                          <p class="icons"> location-image: </p>
                          <div id="location">${lists.location.city}, ${lists.location.country}</div>
                          </div>
      
                          <div class="bullet">
                          <p class="icons"> phone-image: </p>
                          <div id="phone">${lists.cell}</div>
                          </div>
      
                          <div class="bullet">
                          <p class="icons"> email-image: </p>
                          <div>${lists.email}</div>
                          </div>
      
                          </div>
                          </div>
                      </div> `;
          });

          document.getElementById("result").innerHTML = result;
        }
      }
    })
    .catch((error) => {
      alert(
        "Oops, some Error occurred. Please reload the page or try again later."
      );
      console.log(error);
    });
}
