import config from './config.json';
let greeter = document.createElement('div');
greeter.textContent = config.greetText;
module.exports = greeter;
