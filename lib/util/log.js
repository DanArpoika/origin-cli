const colors = require('colors');

module.exports = function (color = 'white', message) {
    console.log(
        colors[color](message)
    );
}
