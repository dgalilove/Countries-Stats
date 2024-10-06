"use strict"

const COUNTRIES_KEY = "countries"

function getCountries() {
  const search = document.querySelector("[name='search']").value
  const country = search.charAt(0).toUpperCase() + search.slice(1)
  const countriesDemo = loadFromStorage(search)
  if (countriesDemo) return renderCountry(country , countriesDemo.flags.png , countriesDemo.borders)

  const url = `https://restcountries.com/v3.1/name/${search}`
  axios
    .get(url)
    .then((res) => {
        const info = res.data[0]
        saveToStorage(search, info)
      const countryImg = info.flags.png
      const countryBorders = info.borders 
      renderCountry(country , countryImg , countryBorders)
    })
    .catch((error) => {
      error 
    })
}

function renderCountry(name, img, neighbors) {
  const elCountry = document.querySelector("pre")

  const strHTML = `
        <h2> ${name} </h2>
        <img src='${img}' alt='Flag of ${name}'>
        <p>Borders:${neighbors}</p>
    `

  elCountry.innerHTML = strHTML
}
