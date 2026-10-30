'use strict';

var prompts = require('@clack/prompts');



Object.keys(prompts).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return prompts[k]; }
	});
});
