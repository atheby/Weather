var weatherVM = function() {
	var self = this;
    self.city = ko.observable();
    self.country = ko.observable();
    self.flag = ko.observable();
    self.current = ko.observable(false);
    self.weather = ko.observableArray();
    self.history = ko.observableArray();
    self.historySelected = ko.observable();

    shouter.subscribe(function(cityId) {
    	var forecast = $.ajax({
    		url: config.jsonUrl + cityId + "&APPID=" + config.api
    	});

    	forecast.done(function(data) {
    		shouter.notifySubscribers(true, "showWeather");
            $(".main").animate({"padding-top": "3%"}, 400);
    		$(".weather-panel").animate({"width": 800, "height": 458, "opacity": 1}, 400);
    		self.city(data.city.name);
    		self.country(data.city.country);
    		self.flag(config.flagUrl + data.city.country.toLowerCase() + config.flagExt);
    		self.weather(getWeatherFromJSON(data));
            if (self.history().length > 0) {
                var add = true;
                for (var x = 0; x < self.history().length; x++) {
                    if (self.history()[x][0].city == self.weather()[0].city)
                        add = false;
                }
                if (add)
                    self.history.unshift(self.weather());
            }
            else
                self.history.push(self.weather());

        });
        forecast.fail(function() {
    		shouter.notifySubscribers("Unexpected error. Please try again later", "showCriticalMessage");
    	});
    }, self, "cityId");

    self.showFromHistory = function() {
    	self.weather(self.historySelected()[0]);
    };
};

function getWeatherFromJSON(data) {
	var temp = [];
    var flag = config.flagUrl + data.city.country.toLowerCase() + config.flagExt;
    var day = data.list[0].dt_txt.slice(8, 10);

	temp.push(new Weather(data.list[0], data.city.name, data.city.country, flag));
	temp[0].current = true;

	for (var x = 0; x < data.list.length; x++) {
		if (day != data.list[x].dt_txt.slice(8, 10) && data.list[x].dt_txt.slice(11) == "12:00:00")
			temp.push(new Weather(data.list[x]));
	}
	return temp;
}
