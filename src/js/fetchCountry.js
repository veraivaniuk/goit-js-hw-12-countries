const BASE_URL = 'https://restcountries.eu/rest/v2/name/'

const findCountry = (searchName) => {
    return fetch(BASE_URL+searchName).then(response => response.json())
}

export default {findCountry};

