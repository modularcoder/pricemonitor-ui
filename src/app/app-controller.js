pm.main
.controller("AppCtrl", function($log, $rootScope, $timeout, $scope, dpd) {
	var vm = this;

	vm.filter = {
		dateFrom: moment().subtract('days', 30).toDate(),
		dateTo: moment().toDate()
	};

	vm.data = [];
	vm.products = [];
	vm.entries = [];

	dpd.products.get().then(function(res) {
		vm.products = res.data.map(function(product) {
			product.isSelected = false;
			return product;
		});
	});

	dpd.entries.get().then(function(res) {
		vm.entries = res.data;

		$log.log("Entries:", vm.entries);
	});

	// On products change, set data
	$scope.$watch(function() {
		return vm.products;
	}, function() {
		setData();
	});


	$scope.$watch(function() {
		return vm.entries;
	}, function() {
		setData();
	});


	vm.queryItems = function() {

	};


	// $timeout(function() {
	// 	vm.options = {
	// 		colors: [
	// 			"#77BFD7", 
	// 			"#A8D6E6"
	// 		],
	// 		labels: ["a", "b"],
	// 		x: "x",
	// 		y: ["a", "b"]
	// 	};

	// 	vm.data = [
	// 		{
	// 			x: "2006",
	// 			a: 1,
	// 			b: 1
	// 		},
	// 		{
	// 			x: "2007",
	// 			a: 1,
	// 			b: 1
	// 		}
	// 	];
	// }, 1000);


	// $timeout(function() {
	// 	vm.options = {
	// 		colors: [
	// 			"#77BFD7", 
	// 			"#A8D6E6"
	// 		],
	// 		labels: ["a", "b"],
	// 		x: "x",
	// 		y: ["a", "b"]
	// 	};

	// 	vm.data = [
	// 		{
	// 			x: "2006",
	// 			a: 11,
	// 			b: 1
	// 		},
	// 		{
	// 			x: "2007",
	// 			a: 11,
	// 			b: 1
	// 		}
	// 	];
	// }, 5000);


	function setData() {

		if (!vm.products.length || !vm.entries.length) {
			return false;
		}

		var dateArr = {};
		

		vm.entries.forEach(function(val) {
			if (typeof dateArr[val.date] == 'undefined') {
				dateArr[val.date] = [];
			}
			var obj = {
				productid: val.productid,
				price: val.price
			};
			dateArr[val.date].push(obj);
		});

		var finalArr = [];
		for (var key in dateArr) {
			var obj = {
				x: parseInt(key)
			};

			dateArr[key].forEach(function(val) {
				obj[val.productid] = val.price;
			});

			finalArr.push(obj);
		}

		// Y Keys based on data

		var yKeys = [];

		for (var key in finalArr[0]) {
			if (key !== "x") {
				yKeys.push(key);
			}
		}


		vm.options = {
			// colors: [
			// 	"#77BFD7", 
			// 	"#A8D6E6"
			// ],
			labels: yKeys,
			x: "x",
			y: yKeys
		};

		vm.data = finalArr;


		$log.log("Options:", vm.options);
		$log.log("Data", vm.data);
	}
	
});

