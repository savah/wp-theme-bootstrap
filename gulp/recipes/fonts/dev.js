var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var notify       = require('gulp-notify');
var displayError = require('../../utils/displayError');
var pumped       = require('../../utils/pumped');

// config
var config       = require('../../config/fonts');


/**
 * Move Fonts to
 * the built theme
 *
 */
module.exports = function () {
	return gulp.src(config.paths.src)
		.pipe(plumber({errorHandler: displayError}))

		.pipe(gulp.dest(config.paths.dest))
		.pipe(notify({
			message: pumped('Fonts Moved'),
			onLast: true
		}));
};