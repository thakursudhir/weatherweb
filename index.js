var inputvalue = document.querySelector('#city');
var btn = document.querySelector('#submit');
var cityOutput = document.querySelector('#cityoutput');
var descriptionOutput = document.querySelector('#description');
var tempOutput = document.querySelector('#temp');
var windOutput = document.querySelector('#wind');
var apiKey = "52e96f70256e99dce614675cd4c678ee"; // Replace with your actual API key


function conversion(val) {
    return (val - 273.15).toFixed(2); // Convert from Kelvin to Celsius
}

btn.addEventListener('click', function() {
    const city = inputvalue.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('City not found');
            }
        
            return res.json();
            
        })
        .then(data => {
            var cityName = data['name'];
            var description = data['weather'][0]['description'];
            var temperature = data['main']['temp'];
            var windSpeed = data['wind']['speed'];

            cityOutput.innerHTML = `Weather of <span>${cityName}</span>`;
            tempOutput.innerHTML = `Temperature: <span>${conversion(temperature)} °C</span>`;
            descriptionOutput.innerHTML = `Sky conditions: <span>${description}</span>`;
            windOutput.innerHTML = `Wind speed: <span>${windSpeed} Km/h</span>`;
        })
        .catch(err => alert(err.message)); // Show the error message
});
