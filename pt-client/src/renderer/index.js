'use strict';

// Vendor.js
require('angular'); // TODO : Can't be saved globally, check why
global.$ = global.jQuery = require('jquery');
require('angular-route');
require('angular-resource');

// Close your eyes (>~v~<)
// This is because electron-webpack actually harcode default loaded html
// and this can't be overwriten without too much sacrifices
// So here it goes ...
    $('body').attr('ng-app', 'myApp');
    $('#app').attr('ng-controller', 'LoginController as LoginController');
    var test = $("<div id='pickme'></div>");
    $('#app').append(test);
    $('#pickme').attr('ng-include', 'LoginController.launch');
// You can open now <( °v° )>

//main
import AppConfig from './app/AppConfig';
import identity from './app/identity/module';

export default angular
.module('myApp', [ 'ngRoute', 'ngResource',
    identity.name
])

.config(AppConfig)