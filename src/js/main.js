import './../less/layout.less';
import $ from 'jquery';
import Alert from './libs/alert.js';
//import Fingerprint2  from 'fingerprintjs2';
window.jQuery = window.$ = $;
$.alert = new Alert();

import './libs/validation.js'

// new Fingerprint2().get(function(result, components){
//   // this will use all available fingerprinting sources
//   console.log(result);
//   // components is an array of all fingerprinting components used
//   console.log(components);
// });