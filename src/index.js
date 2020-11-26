import oneCountry from "./templates/onecountry.hbs";
import fewCountries from "./templates/fewcountry.hbs";
import fetchCountries from "./js/fetchCountries.js";
const { error } = require("@pnotify/core");
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

var debounce = require("lodash.debounce");

const refs = {
  countriesContainer: document.querySelector(".flexmarkup"),
  searchInput: document.querySelector(".search-country"),
};

refs.searchInput.addEventListener("input", debounce(onSearch, 500));

function onSearch(event) {
  event.preventDefault();
  clearMarckup();
  const searchQuery = event.target.value.trim();
  if (searchQuery.length === 0) {
    return;
  }

  fetchCountries(searchQuery).then(variablesMarkup).catch(pushError);
}

function variablesMarkup(data) {
  if (data.length > 10) {
    return pushErrorToMuch();
  }
  if (data.length === 1) {
    return oneCountryMarkup(data);
  }
  if (data.length > 1) {
    return fewCountriesMarkup(data);
  }
}

function oneCountryMarkup(country) {
  const markup = oneCountry(country);
  refs.countriesContainer.insertAdjacentHTML("beforeend", markup);
}

function fewCountriesMarkup(country) {
  const markup = fewCountries(country);
  refs.countriesContainer.insertAdjacentHTML("beforeend", markup);
}

function pushErrorToMuch() {
  error({
    text: "Too many matches found. Please enter a more specific query!",
    type: "info",
  });
}

function pushError(error) {
  console.log("Something wrong");
}


function clearMarckup() {
  refs.countriesContainer.innerHTML = "";
}
