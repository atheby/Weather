var infoVM = function() {
	var self = this;
	self.message = ko.observable("Default");

	shouter.subscribe(function(message) {
		self.message(message);
		$("#info-panel").addClass("alert-warning");
		$("#info-panel").removeClass("alert-danger");
    	$("#info-panel").animate({"opacity": 1}, 1000);
    }, self, "showWarningMessage");

    shouter.subscribe(function(message) {
		self.message(message);
		$("#info-panel").addClass("alert-danger");
		$("#info-panel").removeClass("alert-warning");
    	$("#info-panel").animate({"opacity": 1}, 1000);
    }, self, "showCriticalMessage");

    shouter.subscribe(function() {
    	$("#info-panel").animate({"opacity": 0}, 250);
    }, self, "showWeather");
};
