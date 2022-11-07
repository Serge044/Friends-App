// change color

document.querySelector(".btn-change-color").onclick = () => {
  document.querySelector("section").classList.toggle("moon");
  document.querySelector("body").classList.toggle("change-mode");
  document.querySelector(".greeting-window").classList.toggle("change-mode");
};

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

function howMany() {
  let howManyLoad = `
  <div class="greeting-window" id="greetingWindow">
  <h1 class="text-hello">Hello!</h1>

  <div class="bullet-sort" id="loadCards">
  <p class="icons">How many cards load?</p>
  <button class="btn_sort" id="two">2</button>
  <button class="btn_sort" id="five">5</button>
  <button class="btn_sort" id="ten">10</button>
  <button class="btn_sort" id="enterManually">Enter manually</button>
  </div>

  <div class="bullet-sort" id="loadCards0-5000">
  <p class="icons"> How-many-cards-load?(0 - 5000) </p>
  <input id="howManyInput" class="how-many-input" type="number" min="1" max="5000" value="5" autofocus></input>
  <button id="get-input" class="btn_sort">Load</button>
  </div>
  </div>
  `;

  document.getElementById("howManyCardsLoad").innerHTML = howManyLoad;

  // !!!

  // ----- work with empty string, symbols not like numbers. add respriction to push button if value is not alloved  -----

  // !!!

  document
    .getElementById("howManyInput")
    .addEventListener("keyup", checkNumberInput);
  document
    .getElementById("howManyInput")
    .addEventListener("click", checkNumberInput);

  function checkNumberInput() {
    const valueFromInput = document.getElementById("howManyInput");
    // console.log(valueFromInput.value);
    if (valueFromInput.value < 1 || valueFromInput.value > 5000) {
      console.log("Only numbers between 1 - 5000 allowed.");
    }
  }
}

howMany();

function menuSort() {
  let menuSort = `
  <div class="menu-sort">

  <div class="bullet-sort">
    <p class="icons"> sort-by-age </p>
    <button class="btn_sort" id="btn-sort-0-99">0 - 99</button>
    <button class="btn_sort" id="btn-sort-99-0">99 - 0</button>
  </div>

  <div class="bullet-sort">
    <p class="icons"> sort-by-sex </p>
    <button class="btn_sort" id="sex-m">M</button>
    <button class="btn_sort" id="sex-w">W</button>
    <button class="btn_sort" id="sex-all">all</button>
  </div>

  <div class="bullet-sort">
    <p class="icons"> sort-by-name </p>
    <button class="btn_sort" id="az">A - Z</button>
    <button class="btn_sort" id="za">Z - A</button>
    </div>

  <div class="bullet-sort">
    <p class="icons"> find-by-name </p>
    <input type="text" class="how-many-input" id="findByName">
  </div>

  <div class="bullet-sort">
    <button class="btn_sort-reset" id="btn-reset">Reset</button>
  </div>

  </div>
  `;
  document.getElementById("menuSort").innerHTML = menuSort;
}

function addDisplayNoneToHowMany() {
  const makeInvisible = document.getElementById("greetingWindow");
  makeInvisible.classList.add("disp-none");
}

function addDisplayNone() {
  const rem = document.getElementById("menuSort");
  rem.classList.add("disp-none");
}
addDisplayNone();

function addDisplayNoneToEnterManually() {
  const rem = document.getElementById("loadCards0-5000");
  rem.classList.add("disp-none");
}
addDisplayNoneToEnterManually();

document.getElementById("enterManually").onclick = function () {
  const rem = document.getElementById("loadCards0-5000");
  rem.classList.remove("disp-none");
};

function removeDisplayNone() {
  const rem = document.getElementById("menuSort");
  rem.classList.remove("disp-none");
}

document.getElementById("get-input").onclick = function () {
  const input = document.getElementById("howManyInput");
  let returnFromInput = Math.floor(input.value);
  console.log(returnFromInput);
  mainProcess(returnFromInput);
};

// add restriction to enter only numbers
// make other filters (perhaps country?)
// add the default number to the input (for example, to load 10 cards)

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
                    <div id="gender">${lists.gender}</div>
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

      document.getElementById("howManyInput").addEventListener("click", smth);

      function smth() {
        const x = document.getElementById("howManyInput");
        console.log(x.value);
      }

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

        // think about trim()
        // think about error after search by name in big amount of friends(>1000)

        // x.value = x.value.trim();

        let lowerCase = x.value.toLowerCase();
        let getArr = cards;
        let sortedArr = [];
        for (let i = 0; i < getArr.length; i++) {
          let lastPlusFirst =
            getArr[i].name.first.toLowerCase() +
            " " +
            getArr[i].name.last.toLowerCase();
          if (lastPlusFirst.includes(lowerCase)) {
            // console.log(lastPlusFirst);
            sortedArr.push(getArr[i]);
            // console.log(getArr[i].name.first.toLowerCase());
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
      addDisplayNoneToHowMany();
      removeDisplayNone();
    })
    .catch((error) => {
      swal({
        icon: "error",
        title: "Oops...",
        text: "Some Error occurred. Please reload the page or try again later.",
        footer: '<a href="">Why do I have this issue?</a>',
      });

      // maked text in console Red, changed font family
      console.log(
        `%c${error}`,
        "color:red; font-family: sant-serif; font-size: 20px"
      );
    });
}
