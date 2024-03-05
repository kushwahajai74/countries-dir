const countryName = new URLSearchParams(location.search).get("q");
const countryDetails = document.querySelector(".country-details");
const darkModeButton = document.querySelector(".header-content p");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((data) => data.json())
  .then((data) => {
    const country = data[0];
    // console.log(country.languages);
    countryDetails.innerHTML = `
    <div class="image"><img src=${country.flags.svg} alt="flag" /></div>
        <div class="details-container">
          <h2>${country.name.common}</h2>
          <div class="details">
            <p><b>Native Name:</b> ${
              Object.values(country.name.nativeName)[0].official
            }</p>
            <p><b>Population: </b> ${country.population.toLocaleString()}</p>
            <p><b>Region: </b> ${country.region}</p>
            <p><b>Sub Region: </b>${country.subregion}</p>
            <p><b>Capital: </b>${country.capital}</p>
            <p><b>Top Level Domain: </b>${country.tld.join(", ")}</p>
            <p><b>Currencies: </b> ${
              Object.values(country.currencies)[0].name
            }</p>
            <p><b>Language: </b> ${Object.values(country.languages)}</p>
       
          </div>
          <div class="border">
            <b>Border countries: </b>
          </div>
        </div>
        `;
    const borderCountriesContainer = document.querySelector(".border");
    country.borders.map((item) =>
      fetch(`https://restcountries.com/v3.1/alpha/${item}`)
        .then((data) => data.json())
        .then(([data]) => {
          const ele = document.createElement("a");
          ele.innerText = data.name.common;
          ele.href = `/country.html?q=${data.name.common}`;
          borderCountriesContainer.appendChild(ele);
        })
    );
  });

let flag = false;
if (localStorage.getItem("theme")) {
  document.body.classList.add("dark");
}
darkModeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  flag = !flag;
  localStorage.setItem("theme", `${flag}`);
});
darkModeButton.style.cursor = "pointer";
