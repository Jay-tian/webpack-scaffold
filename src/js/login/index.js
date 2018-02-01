import './../../less/page/login.less'
import particlesJson from './particles.js';

require ('particles.js');
particlesJS('particles-js', particlesJson);

$('.js-register').on('click',function(){
    $('.login-main').addClass('register-hide');
    $('.register-main').removeClass('register-hide');
})

$('.js-login').on('click',function(){
    $('.register-main').addClass('register-hide');
    $('.login-main').removeClass('register-hide');
})
