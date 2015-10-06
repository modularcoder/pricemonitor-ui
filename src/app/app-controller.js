pm.main
.controller("AppCtrl", function(
	$log, $rootScope, $timeout, $scope,
	App, dpd, highchartsNG
) {
	var vm = this;

	vm.ready = false;

	highchartsNG.ready(function() {	
		vm.ready = true;
	}, this);


	/*********************************************
	*				Chart Configs
	*********************************************/

	vm.chartConfig = {
		chart: {
			type: 'area'
		},
		xAxis: {
			type: "datetime",
			tickmarkPlacement: 'on',
			title: {
				enabled: false
			}
		},
		yAxis: {
			type: 'logarithmic',
		},
		title: {
			text: ''
		},
		options: {
			legend: {
				enabled: false
			},
			plotOptions: {
				area: {
					stacking: 'normal',
					lineColor: '#666666',
					lineWidth: 1,
					// treshold: null,
					states: {
						hover: {
							lineWidth: 1,
							radius: 2,
							symbol: 'circle',
						}
					},
					marker: {
						enabled: false,
						radius: 2
					}
				}
			},
		},
		series: [],
		useHighStocks: false
	};

	/*********************************************
	*				Filter
	*********************************************/

	vm.filter = {
		dateFrom: moment().subtract('days', 30).toDate(),
		dateTo: moment().toDate()
	};

	vm.products = [];
	vm.entries = [];

	/*********************************************
	*				Products
	*********************************************/



	if (App.products.length) {
		$log.log("App factory:", angular.copy(App));

		vm.products = App.products.map(function(product) {
			product.isSelected = false;
			return product;
		});
	}
	else {
		dpd.products.get().then(function(res) {
			vm.products = res.data.map(function(product) {
				product.isSelected = false;
				product.norm = product.dailynorm;
				return product;
			});
		});
	}



	/*********************************************
	*				Entries
	*********************************************/

	vm.queryItems = function() {
		dpd.entries.get({
			$sort: {
				date: 1
			},
			date: {
				$gte: moment(vm.filter.dateFrom).unix(),
				$lte: moment(vm.filter.dateTo).unix()
			}
		}).then(function(res) {
			vm.entries = res.data;
		});
	};

	vm.setData = setData;

	vm.queryItems();

	/*********************************************
	*				Watchers
	*********************************************/

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


	function setData() {

		if (!vm.products.length || !vm.entries.length) {
			return false;
		}

		var finalSeriesArr = [];
		var finalDateArr = [];
		var idArr = {};

		vm.products.forEach(function(val, key) {
			val.color = key;
			vm.products[key] = val;
		});

		vm.productsSelected = _.filter(vm.products, function(item) {
			return item.isSelected;
		});

		var productidArr = _.indexBy(vm.productsSelected, 'id');

		vm.entries.forEach(function(val) {
			if (typeof productidArr[val.productid] === 'undefined') return;

			if (typeof idArr[val.productid] == 'undefined') {
				idArr[val.productid] = [];
			}

			var sum = productidArr[val.productid].norm * (val.price / productidArr[val.productid].ammount);
			sum = App.members * Math.round(sum);

			var arr = [];
			arr.push(val.date * 1000);
			arr.push(sum);
			idArr[val.productid].push(arr);
		});

		for (var productid in idArr) {
			finalSeriesArr.push({
				name: productidArr[productid].name,
				type: "area",
				data: idArr[productid],
				color: Highcharts.getOptions().colors[productidArr[productid].color]
			});
		}

		finalSeriesArr.push({
            type: 'line',
            name: 'Daily Salary',
			marker: {
				enabled: false,
				radius: 2
			},
			color: '#000000',
			data: [[moment(vm.filter.dateFrom).unix() * 1000, App.dailyBudget], [moment(vm.filter.dateTo).unix() * 1000, App.dailyBudget]]
        });

		vm.chartConfig.series = finalSeriesArr;


		// console.log(finalDateArr);
		// console.log(finalSeriesArr);
	};
	
});

