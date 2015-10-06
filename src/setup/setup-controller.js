pm.main.controller("SetupCtrl", function(
	$log, $rootScope, $timeout, $scope, $state,
	dpd, productsData, App
) {
	var vm = this;

	/******************************************
	*			Initial Values
	*******************************************/
	vm.budget = 150000;
	vm.members = 1;

	vm.steps = [
		'people',
		'products'
	];

	vm.activeStep = 0;


	vm.next = function() {
		vm.activeStep++;
	};


	vm.prev = function() {
		vm.activeStep--;
	};

	vm.finish = function() {
		// Attach data to rootscope
		App.dailyBudget = vm.budget / 30;
		App.members = vm.members;
		App.products = _.filter(vm.products, function(item) {
			return item.active;
		});


		$log.log(angular.copy(App.products));

		$state.go('app');
	};

	/******************************************
	*			Products Selection
	*******************************************/

	vm.products = productsData.map(function(item) {
		item.active = false;

		return item;
	});

	// vm.products = productsData.map(function(item) {
	// 	item.num = 0;

	// 	return item;
	// });

});

