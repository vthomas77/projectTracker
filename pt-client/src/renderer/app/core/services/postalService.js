'use strict';

export default /*@ngInject*/ function PostalService() {

	function PostalService() {
		this.channel = postal.channel();
	};

	PostalService.prototype.subscribe = function($scope, topic, fcn) {
		var subscription = this.channel.subscribe(topic, fcn);
		this.registerSubscription($scope, subscription);
		return subscription;
	};

	PostalService.prototype.publish = function(topic, event) {
		this.channel.publish(topic, event);
	};

	// Clean subscription when is teared down
	PostalService.prototype.registerSubscription = function($scope, subscription) {
		$scope.$on("$destroy", function() { subscription.unsubscribe(); });
	};

	return new PostalService();
};
