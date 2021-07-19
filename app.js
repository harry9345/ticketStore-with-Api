let $ = document;
let form = $.getElementById("formSubmit");

// origin tags

let originCountryDiv = $.getElementById("countySelectOrigin");
let originCountrySelectTag = $.createElement("select");
originCountryDiv.appendChild(originCountrySelectTag);
originCountrySelectTag.className = "form-select";
originCountrySelectTag.onchange = originCountrySelection;
let originCountry = null;
let originCityDiv = $.getElementById("citySelectOrigin");
let originCitySelectTag = $.createElement("select");
originCitySelectTag.className = "form-select mt-3";
originCitySelectTag.onchange = selectedOriginCity;
let originCity = null;

// dest tags

let destCountryDiv = $.getElementById("countySelectDest");
let destCountrySelectTag = $.createElement("select");
destCountryDiv.appendChild(destCountrySelectTag);
destCountrySelectTag.className = "form-select";
destCountrySelectTag.onchange = destCountrySelection;
let destCountry = null;
let destCityDiv = $.getElementById("citySelectDest");
let destCitySelectTag = $.createElement("select");
destCitySelectTag.className = "form-select mt-3";
destCitySelectTag.onchange = selectedDestCity;
let destCity = null;

//---- result

// country Api
const getCountry = async () => {
  try {
    const response = await axios.get(
      "https://countriesnow.space/api/v0.1/countries"
    );
    renderCountry(response.data.data);
  } catch (error) {
    console.log("error", error);
  }
};
getCountry();

// rendering country

function renderCountry(list) {
  list.forEach((country) => {
    originCountrySelectTag.insertAdjacentHTML(
      "beforeend",
      `
        <option value="${country.country}">${country.country}</option>
      `
    );
    destCountrySelectTag.insertAdjacentHTML(
      "beforeend",
      `
        <option value=${country.country}>${country.country}</option>
      `
    );
  });
}

// country Selection

function originCountrySelection() {
  let statusOrigin = "origin";
  originCountry = originCountrySelectTag.value;
  selectCity(originCountry, statusOrigin);
}
function destCountrySelection() {
  let statusDest = "destination";
  destCountry = destCountrySelectTag.value;
  selectCity(destCountry, statusDest);
}

// --------------city selection

// city Api

async function selectCity(scountry, status) {
  var config = {
    method: "post",
    url: "https://countriesnow.space/api/v0.1/countries/cities",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    data: JSON.stringify({ country: scountry }),
  };
  try {
    const response = await axios(config);
    renderCitySelectTag(response.data.data, status);
  } catch (error) {
    console.log("error", error);
  }
}
// rendering cities

function renderCitySelectTag(cities, status) {
  if (status === "origin") {
    originCitySelectTag.innerHTML = "";
    originCityDiv.appendChild(originCitySelectTag);
    cities.forEach((city) => {
      originCitySelectTag.insertAdjacentHTML(
        "beforeend",
        `
              <option value="${city}">${city}</option>
            `
      );
    });
  } else if (status === "destination") {
    destCitySelectTag.innerHTML = "";
    destCityDiv.appendChild(destCitySelectTag);
    cities.forEach((city) => {
      destCitySelectTag.insertAdjacentHTML(
        "beforeend",
        `
              <option value="${city}">${city}</option>
            `
      );
    });
  }
}

function selectedOriginCity() {
  originCity = originCitySelectTag.value;
  return originCity;
}
function selectedDestCity() {
  destCity = destCitySelectTag.value;
  return destCity;
}

//------ rendering result
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkAvailibility();
});

let resultDiv = $.getElementById("con");
function checkAvailibility() {
  resultDiv.insertAdjacentHTML(
    "beforebegin",
    `
  <div>
  <p class="p"> Your Ticket From 
  <span class="span"> ${originCountry}</span> 
  ,
  <span class="span"> ${originCity}</span> 
  To
   <span class="span">${destCountry}</span>
  , 
  <span class="span">${destCity} </span>
   </p>
  </div>
  `
  );
}

let time = $.getElementById("time");
const today = moment().format("YYYY-MM-DD");
time.innerHTML = today;

let len = window.history.length;
console.log("You visited " + len + " Pages.");
