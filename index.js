document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let city = document.getElementById('city-select').value;
    getWeather(city);
});

function getWeather(city) {
    const apiKey = 'bd57d8da94ba5a3a12bd390a6bda542c'; // Correction de la clé API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let weatherResult = document.getElementById('weather-result');
            if (data.cod === 200) {
                weatherResult.innerHTML = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p>Température: ${data.main.temp}°C</p>
                    <p>Météo: ${data.weather[0].description}</p>
                    <p>Humidité: ${data.main.humidity}%</p>
                `;
            } else {
                weatherResult.innerHTML = `<p>Ville non trouvée</p>`;
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            document.getElementById('weather-result').innerHTML = `<p>Erreur lors de la récupération des données météo</p>`;
        });
}
