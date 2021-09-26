let country;
fetch("https://restcountries.com/v2/all")
    .then(function(res) {
        //console.log(res);
        return res.json();
    })
    .then(function(data) {
        //console.log(data);
        initialize(data);
    })
    .catch(function(err) {
        alert("Error: " + err.message);
    });



function initialize(countriesdata) {
    country = countriesdata;
    let nations = "";
    for (let i = 0; i < country.length; i++) {
        let name = country[i].name;
        nations += `
        <div class="col-sm-4">
                <div class="col-lg-12 main-div">
                    <div class="card border-light">
                        <div class="card-header">
                            <b class="country">${country[i].name}</b>
                        </div>
                        <div class="card-body main">
                            <img src=${country[i].flags[0]} class="card-img-top main1">
                            <p class="nation-capital main1 mainCapital">Capital: ${country[i].capital}</p>
                            <p class="nation-region main1">Region: ${country[i].region}</p>
                            <p class="nation-code main1">Country Code: ${country[i].alpha3Code}</p>
                         <button class="btn btn-primary main1" id="buttonClick" onclick="myFunction(${country[i].latlng},${country[i].latlng})">Click for Weather</button>
                        </div>
                    </div>
                </div>
            </div>
        `;


    }

    document.getElementById("all").innerHTML = nations;
}

function myFunction(lat, lng) {
    //console.log(lat);
    //console.log(lng);
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&appid=1f56e745510aa4bba403f05790216301")
        .then(function(res) {
            //console.log(res);
            return res.json();
        })
        .then(function(datas) {
            //console.log(datas);
            displayModalWeather(datas);
        })
        .catch(function(err) {
            alert("Error: " + err.message);
        });

}

function displayModalWeather(weatherDatas) {
    let data = weatherDatas;
    console.log(data);
    document.getElementById("myDialog").showModal();
    let nationWeather;

    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    nationWeather = `
    <div class="modal-header weatherDisplay">
    <h1>Weather in ${name}</h1>
    </div>
    <div class="weatherDisplay">
    <img SameSite=Lax src="http://openweathermap.org/img/wn/${icon}.png">
    <p>${description}</p>
    <p>Temperature : ${temp}<sup>o</sup>C</p>
    <p>Humidity : ${humidity}%</p>
    <p>Wind : ${speed}km/hr</p>
    </div>
    <div class="modal-footer weatherDisplay">
    <button type="button" class="btn btn-default btn-to-close" onClick="closeDialog()">Close</button>
    </div>
    `;

    document.getElementById("myDialog").innerHTML = nationWeather;
}
var x = document.getElementById("myDialog");

function closeDialog() {
    x.close();
}