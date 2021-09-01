const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');
const countryContainer = document.getElementById('country-container');
const errorDiv = document.getElementById('erros');
const countryDetails = document.getElementById('country-details');

const searchValue = searchBtn.addEventListener('click', function () {
    const search = searchInput.value;



    if (search === '') {
        errorDiv.innerText = "Search field can't be empty";

    }



    //clear Dom
    searchInput.value = '';
    countryContainer.innerHTML = '';
    countryDetails.innerHTML = '';


    const url = `https://restcountries.eu/rest/v2/name/${search}`
    fetch(url)
        .then(res => res.json())
        .then(data => showData(data))
        .finally(() => searchInput.value === "");


});

function showData(CountryArry) {
    {



        //error Handling
        if (CountryArry.status === 404) {
            errorDiv.innerText = 'No Result Found';
            return;
        }
        else {
            errorDiv.innerText = '';
        }

        // function showDetails(alph) {
        //     console.log(alph);
        //     // fetch('https://restcountries.eu/rest/v2/alpha/${alpha3Code}')
        //     //     .then(res => res.json())
        //     //     .then(data => console.log(data));
        // }


        CountryArry.forEach((item) => {
            // console.log(item.name);
            const div = document.createElement('div');
            div.classList.add('col-md-3');
            div.innerHTML = `
            <div class="rounded overflow-hidden border p-2">
                <img src="${item.flag}"
                 class="w-100" alt="" />
            </div>
            <!-- Body -->
            <div class="
          py-2
          d-flex
          justify-content-between
          align-items-center
          d-md-block
          text-md-center
        ">
                <h1>"${item.name}"</h1>
                <button onclick="showDetails('${item.alpha3Code}')" class="btn btn-dark">Learn More</button>
            </div>
            `;


            countryContainer.appendChild(div);

        });
    }

}
function showDetails(alpha3) {
    // console.log(alpha3);
    fetch(`https://restcountries.eu/rest/v2/alpha/${alpha3}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            countryDetails.innerHTML = `
          <div class="col-md-7">
                <div class="rounded overflow-hidden border p-2">
                    <img src="${data.flag}" class="w-100" alt="" />
                </div>
            </div>
          <div class="col-md-5">
                <h1>${data.name}</h1>
                <p>Capital: ${data.capital}</p>
                <p>Population: ${data.population}</p>
                <p>Currency Name: ${data.currencies[0].name}</p>
                <p>Currency Symbol: ${data.currencies[0].symbol}</p>
            </div>
          `
        });
}