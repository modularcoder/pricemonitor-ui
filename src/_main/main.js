var pm = {};

pm.main = angular.module("pm", [

	// Vendor modules
	'angular.morris-chart',
	'highcharts-ng',
	'dpd',

	// Application cached tempaltes
	// "pm.templates",

	// Application modules
	"pm.common",
	"pm.app"
]);

// Common components module
pm.common = angular.module("pm.common", []);

// App module
pm.app = angular.module("pm.app", []);
