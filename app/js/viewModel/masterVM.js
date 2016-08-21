var masterVM = (function() {
	var self = this;
	self.infoVM = new infoVM();
    self.searchVM = new searchVM();
    self.weatherVM = new weatherVM();
});

ko.applyBindings(masterVM);
