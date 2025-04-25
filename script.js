window.addEventListener("DOMContentLoaded", function () {
    const tempratureField = document.querySelector(".temp p");
    const locationField = document.querySelector(".time-location p");
    const dateAndTimeField = document.querySelector(".time-location span");
    const conditionIcon = document.querySelector(".condition-icon");
    const conditionText = document.querySelector(".condition-text");
    const searchField = document.querySelector(".search-area");
    const form = document.querySelector(".form");
  
    let target = 'mumbai';
  
    form.addEventListener('submit', searchForLocation);
  
    async function fetchResult(targetLocation) {
      const url = `http://api.weatherapi.com/v1/current.json?key=1606ba8cd3f34c508c573855252504&q=${targetLocation}&aqi=no`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
  
        const locationName = data.location.name;
        const time = data.location.localtime;
        const temp = data.current.temp_c;
        const condition = data.current.condition.text;
        const iconUrl = data.current.condition.icon;
  
        updateDetails(locationName, time, temp, condition, iconUrl);
      } catch (error) {
        alert("Location not found. Please try another city.");
      }
    }
  
    function updateDetails(locationName, time, temp, condition, iconUrl) {
      const [splitDate, splitTime] = time.split(' ');
      const day = getDayName(new Date(splitDate).getDay());
  
      tempratureField.innerText = temp + "°C";
      locationField.innerText = locationName;
      dateAndTimeField.innerText = `${splitDate} - ${day} ${splitTime}`;
      conditionText.innerText = condition;
      conditionIcon.src = "https:" + iconUrl;
    }
  
    function searchForLocation(e) {
      e.preventDefault();
      const location = searchField.value.trim();
      if (location) {
        target = location;
        fetchResult(target);
      }
    }
  
    function getDayName(number) {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return days[number];
    }
  
    fetchResult(target);
  });
  