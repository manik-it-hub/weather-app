const apiKey = "f254d82e84d10936466466bf55bf3549";

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "❗ Please enter a city.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      resultDiv.innerHTML = `❌ Error: ${data.message}`;
      return;
    }

    const { name, main, weather } = data;
    const icon = weather[0].icon;

    resultDiv.innerHTML = `
      <h2>${name}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${weather[0].description}"/>
      <p>🌡️ Temperature: ${main.temp} °C</p>
      <p>🌥️ Condition: ${weather[0].description}</p>
    `;
  } catch (error) {
    console.error("Fetch error:", error);
    resultDiv.innerHTML = "🚫 Something went wrong!";
  }
}

document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
