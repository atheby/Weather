function Weather(data, city, country, flag) {
	var self = this;
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	self.current = false;
	self.city = city;
	self.country = country;
	self.flag = flag;
	self.day = days[(new Date(data.dt * 1000)).getDay()];
	self.temp = (data.main.temp - 273.15).toPrecision(2) + "&deg;C";
	self.icon = config.iconUrl + data.weather[0].icon + config.iconExt;
	self.humidity = data.main.humidity + "%";
	self.pressure = data.main.pressure + "hpa";
	self.wind = data.wind.speed + "m/s";
}
