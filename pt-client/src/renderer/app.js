'use strict';

// Vendor.js - Couldn't be done in one of the entry point to export as global variables (for angular/jquery)
const css = require('./css/style.css').toString();
require('bootstrap');
require('bootstrap/dist/css/bootstrap.min.css');

global.$ = global.jQuery = require('jquery');
require('angular'); 
require('angular-route');
require('angular-resource');
require('angular-gantt');
require('angular-moment');

// Close your eyes (>~v~<)
// This is because electron-webpack actually harcode default loaded html
// and this can't be overwriten without too much sacrifices
// So here it goes ...
    $('body').attr('ng-app', 'myApp');
    $('#app').attr('ng-controller', 'LoginController as LoginController');
    var entryPoint = $("<div id='pickme'></div>");
    $('#app').append(entryPoint);
    $('#pickme').attr('ng-include', 'LoginController.launch');
// You can open now <( °v° )>

//module
import identity from './app/identity/module';
import core from './app/core/module';

import AppConfig from './AppConfig.js'

export default angular
.module('myApp', [ 'ngRoute', 'ngResource', 'angularMoment', 'gantt',
    identity.name,
    core.name
])

.value('clientConfig', {
    API_URL: process.env.API_URL
})

.constant('events', {
  LOGIN_SUCESS: 'auth-login-success',
  LOGIN_FAILED: 'auth-login-failed',
  LOGOUT: 'auth-logout-success'
})

.config(AppConfig)