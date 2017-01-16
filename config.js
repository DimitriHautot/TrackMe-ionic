// See https://scotch.io/tutorials/properly-set-environment-variables-for-angular-apps-with-gulp-ng-config

var shared = {
	googlaMapsKey: process.env.GOOGLE_MAPS_API_KEY
};

var environments = {
	development: {
		ENV_VARS: shared
	},
	production: {
		ENV_VARS: shared
	}
};

module.exports = environments;
