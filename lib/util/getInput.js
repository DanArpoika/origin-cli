const colors = require('colors');
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
  

module.exports = function(q){
    let response;

    console.log(
        colors.green(q)
    );
    
    rl.prompt();

    return new Promise(( resolve , reject) => {
        rl.on('line', (userInput) => {
            response = userInput;
            rl.close();
        });

        rl.on('close', () => {
            resolve(response);
        });

        rl.on('error', () => {
            reject(new Error('Error receiving user input.'));
        });
    });
};