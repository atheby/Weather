var searchVM = function() {
	var self = this;
    self.cityName = ko.observable("");

    self.searchCity = function() {
    	$.ajax({
    		url: config.citiesUrl,
            beforeSend: function(xhr) { xhr.overrideMimeType("application/json"); }
    	}).done(function(data) {
    		var cityId = getCityId(data, self.cityName());

    		if (cityId != 0)
    			shouter.notifySubscribers(cityId, "cityId");
    		else
    			shouter.notifySubscribers("City not found. Try again.", "showWarningMessage");
    	}).fail(function() {
    		shouter.notifySubscribers("Unexpected error. Please try again later", "showCriticalMessage");
    	});
    };
};

function getCityId(data, name) {
	for (var x = 0; x < data.length; x++) {
		if (data[x].name.toUpperCase() === name.toUpperCase())
			return data[x]._id;
	}
	return 0;
}
