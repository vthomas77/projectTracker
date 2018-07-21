'use strict';

// Vendor.js - Couldn't be done in one of the entry point to export as global variables (for angular/jquery)
const css = require('./css/style.css').toString();
require('bootstrap');
require('bootstrap/dist/css/bootstrap.min.css');

global.$ = global.jQuery = require('jquery');
global.postal = require('postal');
require('angular'); 
require('angular-route');
require('angular-resource');
require('angular-gantt');
require('angular-moment');
require('angular-ui-bootstrap');
require('angular-messages');

// Close your eyes (>~v~<)
// This is because electron-webpack actually harcode default loaded html
// and this can't be overwriten without too much sacrifices
// So here it goes ...
    $('body').attr('ng-app', 'myApp');
    // LoginController
    // $('#app').attr('class', 'main-vue');
    $('#app').attr('ng-controller', 'MainController as MainController');
    var Loggin = $("<identity-directive ng-if='!MainController.connected'></identity-directive>");
    $('#app').append(Loggin);
    var entryPoint = $(
        "<div ng-if='MainController.connected'>" +
        "<top-navigation></top-navigation>" +
        "<side-navigation></side-navigation>" +
        "<div ng-view></div>" +
        "</div>");
    $('#app').append(entryPoint);
    // var entryPoint = $("<main-vue></main-vue>");
    // $('#pickme').attr('ng-view', 'LoginController.launch');
// You can open now <( °v° )>

//module
import common from './app/common/module';
import identity from './app/identity/module';
import core from './app/core/module';

import AppConfig from './AppConfig.js'
import AppRun from './AppRun.js'

export default angular
.module('myApp', [ 'ngRoute', 'ngResource', 'angularMoment', 'gantt', 'ui.bootstrap', 'ngMessages',
    common.name,
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
.run(AppRun)
.config(AppConfig)