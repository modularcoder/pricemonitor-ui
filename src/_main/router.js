pm.main

.config(function($stateProvider, $urlRouterProvider) {


	$urlRouterProvider.otherwise(function($injector) {
		var $state = $injector.get("$state");
		var $stateParams = $injector.get("$stateParams");

		$state.go("setup", $stateParams);
	});


	$stateProvider

	.state('setup', {
		url: "/setup",
		templateUrl: "/templates/setup/setup.html",
		controller: "SetupCtrl as setup",
		resolve: {
			productsData: function(dpd) {
				return dpd.products.get()
				.then(function(res) {
					return res.data
				});
			}
		}
	})

	.state('app', {
		url: "/app",
		templateUrl: "/templates/app/app.html",
		controller: "AppCtrl as app"
	});

})

;