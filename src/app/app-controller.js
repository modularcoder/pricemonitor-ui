pm.main
.controller("AppCtrl", function($log, $rootScope) {
	var vm = this;

	setData();

	$log.log("vm.data:", vm.data);

	function setData() {
		vm.options = {
			colors: [
				"#77BFD7", 
				"#A8D6E6"
			],
			labels: [
				"Series A", 
				"Series B"
			],
			x: "x",
			// y: ["1", "2"]
			y: ["a", "b"]
		};

		vm.data = generateRandomData();
	}


	function generateRandomData() {

		var res = [];

		var today = moment();
		var monthAgo = moment().subtract(30, 'days');

		var i = 1;

		for (var date = monthAgo; date.isBefore(today); date.add(1, 'day')) {


			res.push({
				// date: date.toDate().toString(),
				x: i,
				a: Math.random() * 1500,
				b: Math.random() * 400
			});

			i++;
		}

		return res;
	}
	
});

