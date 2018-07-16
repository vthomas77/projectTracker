'use strict';

// Vendor.js
global.angular = require('angular');

require('angular-route');
require('angular-resource');

//main
import AppConfig from './app/AppConfig';
import identity from './app/identity/module';

export default angular

.module('myApp', [ 'ngRoute', 'ngResource',
    identity.name
])

.config(AppConfig)