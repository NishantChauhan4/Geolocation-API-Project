const btn = document.getElementById("btn");
const country_container = document.getElementById("country-container");
const map = document.getElementById("map");
/*
http://api.positionstack.com/v1/reverse
    ? access_key = 695c414dfef848097489adaa53e600d
    & query = 40.7638435,-73.9729691

    695c414dfef848097489adaa53e600d
*/

function geo() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      map.innerHTML = `<iframe src="https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed" width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen></iframe>`;

      getLocation(lat, long);
    });
  }
}

async function getLocation(lat, long) {
  try {
    let response = await fetch(
      `http://api.positionstack.com/v1/reverse?access_key=695c414dfef848097489adaa53e600d9&query=${lat},${long}`
    );

    let data = await response.json();
    console.log(data);
    const country = data.data[0];

    country_container.innerHTML = `
    <div class="content">
    <h2>Continent</h2>
    <p>${country.continent}</p>
  </div>
  <div class="country">
    <h2>Country</h2>
    <p>${country.country}</p>
  </div>
  <div class="region">
    <h2>Region</h2>
    <p>${country.region}</p>
  </div>
  <div class="address">
    <h2>Address</h2>
    <p>${country.label}</p>
  </div>`;
  } catch (error) {
    console.log(error);
  }
}

btn.addEventListener("click", geo);
