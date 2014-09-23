module.exports = SimpleEvents;

function SimpleEvents() {
	this.events = {};
}

SimpleEvents.prototype.on = function(name, fn) {
	if (typeof fn === 'function') {
		if (!this.events[name]) {
			this.events[name] = [];
		}

		this.events[name].push(fn);
	}
};

SimpleEvents.prototype.off = function(name, fn) {
	if (typeof fn === 'undefined') {
		this.events[name] = null;
		delete this.events[name];
	} else {
		var events = this.events[name];
		if (events && typeof fn === 'function') {
			for (var i = 0, j = events.length; i < j; i++) {
				if (events[i] === fn) {
					events.splice(i, 1);
					j--;
					i--;
				}
			}
		}
	}
};

SimpleEvents.prototype.emit = function(name, parameters) {
	var events = this.events[name];
	if (events) {
		events.forEach(function(cb) {
			cb(parameters);
		});
	}
};