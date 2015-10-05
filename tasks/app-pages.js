module.exports = function(gulp, plugins, paths) {
	
	gulp.src(paths.app.pages.src)
		// Handle errors
		.on('error', plugins.util.log)

		// Rename .page.hbs to .html
		.pipe(plugins.rename(function (path) {
			path.basename = path.basename.replace("-page", "");
			path.extname = ".html"
		}))
		
		// Flatten structure
		.pipe(plugins.flatten())

		// Output
		.pipe(gulp.dest(paths.app.pages.dest));
};