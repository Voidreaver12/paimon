const fs = require('fs');
const characters = require('../data/characters.json');

const save = (msg, saveData) => {
    messages = [];
    
    let params = msg.content.split(/\s+/);
    let matchFound = false;
    
    for (let i = 0; i < saveData.length; i++) {
        if (msg.author.toString() === saveData[i].member && (params.length <= 1 || params[1] === saveData[i].character)) {
            matchFound = (params.length >= 2 && params[1] === saveData[i].character);
            let saveDays = Math.floor((new Date().getTime() - saveData[i].startTime) / 86400000);
            messages.push(`You have been saving for ${saveData[i].character} for ${saveDays} days. Stay strong ${msg.author}!`);
        }
    }
    
    if (params.length >= 2) {
        let character = characters[params[1]];
        if (character) {
            if (!matchFound) {
                let startTime = new Date().getTime();
                if (params.length >= 3) {
                    try {
                        startTime -= (parseInt(params[2]) * 86400000);
                    } catch (err) {
                        console.log('Error parsing # days ' + params[2], err);
                    }
                }
                saveData.push({
                    member: msg.author.toString(),
                    character,
                    startTime
                });
                fs.writeFile('./data/saves.json', JSON.stringify(saveData), (err) => {
                    if (err) {
                        msg.channel.send('Paimon sorry, something didn\'t work quite right.');
                        console.log('Error writing to file saves.json');
                    } 
                });
                messages.push(`You started saving for ${character}. Good luck ${msg.author}!`);
            }
        } else {
            messages.push(`There is no character named ${params[1]}, dummy!`);
        }
    }

    msg.channel.send(messages.join('\n'));
};

module.exports = save;