pm.main
.controller("AppCtrl", function($log, $rootScope) {
	var vm = this;

	setData();

	$log.log("vm.data:", vm.data);

	function setData() {
		vm.options = {
			colors: [
				"#31C0BE", 
				"#c7254e"
			],
			labels: [
				"Series A", 
				"Series B"
			],
			x: "date",
			y: ["1", "2"]
		};

		vm.data = generateRandomData();
	}


	function generateRandomData() {

		var res = [];

		var today = moment();
		var monthAgo = moment().subtract(30, 'days');

		for (var date = monthAgo; date.isBefore(today); date.add(1, 'day')) {


			res.push({
				date: date.toDate(),
				1: Math.random() * 1500,
				2: Math.random() * 400
			});
		}

		return res;
	}
	
});

