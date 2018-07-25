'use strict';

// Vendor.js - Couldn't be done in one of the entry point to export as global variables (for angular/jquery)
const css = require('./css/style.css').toString();
require('bootstrap');
require('bootstrap/dist/css/bootstrap.min.css');


global.$ = global.jQuery = require('jquery');
require('./adminLTE/index.js');
global.postal = require('postal');
require('angular'); 
require('angular-route');
require('angular-resource');
require('angular-gantt');
require('angular-moment');
require('angular-ui-bootstrap');
require('angular-messages');
require('angular-animate');

// Close your eyes (>~v~<)
// This is because electron-webpack actually harcode default loaded html
// and this can't be overwriten/choose another html entry point without too much sacrifices
// So here it goes ...
    $('body').attr('ng-app', 'myApp');
    // Admin LTE css
    $('body').attr('class', 'skin-blue sidebar-mini');
    // MainController
    $('#app').attr('ng-controller', 'MainController as MainController');
    // Directive if not connected
    var Loggin = $("<identity-directive ng-if='!MainController.connected'></identity-directive>");
    $('#app').append(Loggin);
    // If connected -> entryPoint of the app with menu and sidebar
    var entryPoint = $(
        "<div ng-if='MainController.connected'>" +
        "<alert-directive></alert-directive>" + // Alert
        "<top-navigation></top-navigation>" + //Top menu
        "<side-navigation></side-navigation>" + // Navbar menu
        "<div id='pickme' ng-view></div>" +
        "</div>");
    $('#app').append(entryPoint);
// You can open now <( °v° )>

//module
import common from './app/common/module';
import identity from './app/identity/module';
import alert from './app/alert/module';
import entityList from './app/entitylist/module';
import entity from './app/entity/module';

import core from './app/core/module';

import AppConfig from './AppConfig.js'
import AppRun from './AppRun.js'

export default angular
.module('myApp', [ 'ngRoute', 'ngResource', 'angularMoment', 'gantt', 'ui.bootstrap', 'ngMessages', 'ngAnimate',
    common.name,
    identity.name,
    alert.name,
    core.name,
    entityList.name,
    entity.name
])

// Value set in settings.json -> check webpack.renderer.addition.js
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