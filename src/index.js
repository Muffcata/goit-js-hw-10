import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const inputSearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

const resetCountry = () => {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
};

const checkInput = () => {
  fetchCountries(inputSearch.value.trim())
    .then(elements => {
      renderChoice(elements);
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
};
const renderChoice = elements => {
  if (elements.length === 1) {
    const markup = elements
      .map(el => {
        return `<li>
                <p class="text"><img class="img" src="${
                  el.flags.svg
                }" alt="Country flag"> ${el.name.official} </p>
                <p> <b>Capital: </b> ${el.capital} </p>
                <p> <b>Population: </b>${el.population} </p>
                <p> <b>Languages: </b>${Object.values(el.languages)} </p>
            </li>`;
      })

      .join('');

    countryList.innerHTML = markup;
  } else if (elements.length >= 2 && elements.length <= 10) {
    resetCountry();
    const markup = elements
      .map(el => {
        return `<li class="country-list__item">
            <p class="mini-text"><img class="mini-img" src="${el.flags.svg}" alt="Country flag"> ${el.name.official} </p>
            </li>`;
      })

      .join('');
    countryList.innerHTML = markup;
  } else if (elements.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    resetCountry();
  }
};

inputSearch.addEventListener('input', debounce(checkInput, DEBOUNCE_DELAY));
