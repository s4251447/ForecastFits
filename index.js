const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const recommendButton = document.querySelector('.recommend-button'); // Corrected selector

search.addEventListener('click', () => {
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                recommendButton.style.display = 'none'; // Hide the button if location is invalid
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Haze':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';

            // Show the recommendation button
            recommendButton.style.display = 'block';
            recommendButton.classList.add('fadeIn');

            // Add click event to the recommendation button
            recommendButton.onclick = () => {
                window.location.href= 'clothing.html';
            };
        });
});

// Function to recommend clothing
function recommendClothing(temperature, weatherCondition) {
    const recommendations = document.getElementById('recommendations');
    recommendations.innerHTML = '';

    if (temperature <= 10) {
        recommendations.innerHTML += '<div>Warm jacket and thermal wear recommended.</div>';
    } else if (temperature <= 20) {
        recommendations.innerHTML += '<div>Light sweater or hoodie suggested.</div>';
    } else {
        recommendations.innerHTML += '<div>T-shirt and shorts are suitable.</div>';
    }

    if (weatherCondition.includes('Rain')) {
        recommendations.innerHTML += '<div>Don\'t forget an umbrella or raincoat.</div>';
    }
}
