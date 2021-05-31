import './styles.css';
import debounce from 'lodash.debounce';
import refs from './js/refs.js';
import cardTemplate from './templates/card.hbs';
import listTemplate from './templates/list.hbs'
import fetchCountry from './js/fetchCountry.js';
import { pnotifyError, pnotifyNotice } from './js/pnotify.js'

// const refs = {
//     input: document.getElementById("countrySearch"),
//     countryList: document.querySelector(".countryList")
// }


refs.input.addEventListener('input', debounce((event)=>{
    event.preventDefault();
    const searchName = event.target.value;
    fetchCountry.findCountry(searchName).then(data => {
        clearCountriesCard();
        if(data.length === 1){
            const markup = data.map((country)=>cardTemplate(country))
            refs.countryList.insertAdjacentHTML("afterbegin", markup);
        } else if( data.length > 1 && data.length <= 10){
            const markup = data.map((country)=>listTemplate(country))
            console.log(markup);
            refs.countryList.insertAdjacentHTML("afterbegin", markup.join(''));
            // render markup list with hendelbars 
            console.log("render markup list with hendelbars", data.length);
        } else if(data.length > 10){
            pnotifyNotice()
            // use pnotify
            console.log("use pnotify", data.length);
        } else {
            pnotifyError()
        };
    }).catch(() => {
        pnotifyError()
            })
}, 1000))

const clearCountriesCard = () => {
    refs.countryList.innerHTML = "";
  }

