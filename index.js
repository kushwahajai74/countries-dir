const countriesContainer = document.querySelector(".countries-container");
const region = document.querySelector(".region");
const searchInput = document.querySelector(".search-container input");
const darkModeButton = document.querySelector(".header-content p");
let allCountriesData;

fetch("https://restcountries.com/v3.1/all")
  .then((data) => data.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });

region.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${region.value}`)
    .then((res) => res.json())
    .then(renderCountries);
});

searchInput.addEventListener("input", (e) => {
  let filteredCountries = allCountriesData.filter((data) =>
    data.name.common.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  renderCountries(filteredCountries);
});

function renderCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.href = `/country.html?q=${country.name.common}`;
    countryCard.classList.add("country-card");

    const cardHTML = `
        <img src=${country.flags.svg} alt="countryImg" />
            <div class="country-info">
                <h3 class="country-name">${country.name.common}</h3>
                <p><b>Population:</b> ${country.population.toLocaleString(
                  "en-IN"
                )}</p>
                <p><b>Region:</b> ${country.region}</p>
                <p><b>Capital:</b>${country.capital}</p>
            </div>`;

    countryCard.innerHTML = cardHTML;
    countriesContainer.append(countryCard);
  });
}
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
