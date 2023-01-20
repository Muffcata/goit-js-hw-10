import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const inputSearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

const checkInput = input => {
  if (input.trim() === '') {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    return true;
  }
  return false;
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
    countryInfo.innerHTML = markup;
    countryList.innerHTML = '';
  } else if (elements.length >= 2 && elements.length <= 10) {
    const markup = elements
      .map(el => {
        return `<li class="country-list__item">
            <p class="mini-text"><img class="mini-img" src="${el.flags.svg}" alt="Country flag"> ${el.name.official} </p>
            </li>`;
      })
      .join('');
    countryInfo.innerHTML = markup;
    countryList.innerHTML = '';
  } else if (elements.length > 10);
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
};

inputSearch.addEventListener(
  'input',
  debounce(() => {
    let names = inputSearch.value.trim();
    if (checkInput(names)) return;
    fetchCountries(names).then(elements => renderChoice(elements));
  }, DEBOUNCE_DELAY)
);
