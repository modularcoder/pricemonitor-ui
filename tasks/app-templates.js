module.exports = function(gulp, plugins, paths) {
	
	gulp.src(paths.app.templates.src)
		// // Handle errors
		// .on('error', plugins.util.log)
	
		// Output
		.pipe(gulp.dest(paths.app.templates.dest));
};