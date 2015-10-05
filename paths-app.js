var config = require('./config');

var srcDir = config.srcDir;
var buildDir = config.buildDir;

/***********************************************
*		Application script files
************************************************/

	/*
		Specifiing the source this way means:

		"take all .js files except /_main/main.js file 
		and then take /_main/main.js file"

		This ensures that main.js file is loaded in the end.
		Ignore context.js files.
	*/

	exports.scripts = {
		src: [
			srcDir + "/_main/main.js",
			srcDir + "/**/!(main.js)*.js"
		],
		dest: buildDir + "/js"
	};

/***********************************************
*		Application style files
************************************************/

	exports.styles = {
		src: [
			srcDir + "/_main/main.less",
			srcDir + "/**/!(main|variables|vendor)*.less",
		],
		dest: buildDir + "/css/"
	};


/***********************************************
*		Application page files
************************************************/

	/*
		Each page file represents a page which will be rendered into .html page.
		Pages can extend layouts.

	*/

	exports.pages = {
		src: srcDir + "/**/*-page.html",
		dest: buildDir + "/"
	};


/***********************************************
*		Application template files
************************************************/
	
	/*
		All template files in application.
		Those should registered as handlebars partials
		in order to use feature like includes or layouts
	*/

	exports.templates = {
		src: srcDir + "/**/*.html",
		dest: buildDir + "/templates"
	};

/***********************************************
*		Application asset files
************************************************/

	exports.assets = {
		src: srcDir + "/_assets/**/*",
		dest: buildDir + "/assets"
	};