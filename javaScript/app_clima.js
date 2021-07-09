const d = document,
  n = navigator,
  api_key = "6bde54e664f3cbe78717c472be2a9897";

const ajax = () => {
  const xhr = new XMLHttpRequest(),
    options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    },
    $temperatura = d.getElementById("feels-like"),
    $main = d.getElementById("main"),
    $ubication = d.getElementById("ubication"),
    $date = d.getElementById("date"),
    $loader = d.querySelector(".loader"),
    $divWeather = d.getElementById("div-weather"),
    $divUbication = d.getElementById("div-ubication");


  const succes = position => {
    let coords = position.coords;

    xhr.addEventListener("readystatechange", (e) => {
      if (xhr.readyState !== 4) return;

      if ((xhr.status >= 200) && (xhr.status < 300)) {
        let json = JSON.parse(xhr.responseText),
          date = new Date().toString().split(" ");

        $divWeather.classList.remove("none");
        $temperatura.innerText = Math.trunc(json.main.feels_like);
        $divUbication.classList.remove("none");
        $main.innerText = json.weather[0].main;
        $ubication.innerText = json.name;
        $date.innerText = `Today · ${date[0]}, ${date[2]} ${date[1]}`;

        setTimeout(() => {
          $loader.classList.add("none");
        }, 500);
      }
    });

    xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${coords.latitude}&lon=${coords.longitude}&appid=${api_key}`);

    xhr.send();
  };

  const error = (err) => {
    console.log(`Error ${err.code}: ${err.message}`);
  };

  n.geolocation.getCurrentPosition(succes, error, options);
}

d.addEventListener("DOMContentLoaded", ajax);