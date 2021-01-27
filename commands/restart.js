const fs = require('fs');
const characters = require('../data/characters.json');

const restart = (msg, saveData) => {
    let params = msg.content.split(/\s+/);
    let updated = false;

    for (let i = 0; i < saveData.length; i++) {
        if (saveData[i].member === msg.author.toString() && (params.length !== 2 || params[1].toLowerCase() === saveData[i].character.toLowerCase())) {
            saveData[i].startTime = new Date().getTime();
            updated = true;
        }
    }
    if (updated) {
        fs.writeFile('./data/saves.json', JSON.stringify(saveData), (err) => {
            if (err) {
                msg.channel.send('Paimon sorry, something didn\'t work quite right.');
                console.log('Error writing to file saves.json');
            } else {
                msg.channel.send(`It's okay ${msg.author}, you'll do better tomorrow!`)
            }
        });
    } else if (params.length === 2) {
        if (characters[params[1]]) {
            msg.channel.send(`You aren't saving for ${params[1]}, dummy!`);
        } else {
            messages.push(`There is no character named ${params[1]}, dummy!`);
        }
    } else {
        msg.channel.send('You aren\'t saving for anyone! Paimon thinks you should save for Paimon.');
    }
};

module.exports = restart;