require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const restart = require('./commands/restart.js');
const save = require('./commands/save.js');
const wish = require('./commands/wish.js');

let saveData = [];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    fs.readFile('./data/saves.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('Error reading file - saves.json');
            return;
        } else {
            saveData = JSON.parse(data);
            console.log(JSON.stringify(saveData));
        }
    });
});

client.on('message', (msg) => {
    if (msg.author !== client.user) {
        if (msg.content.startsWith('*hello')) {
            msg.channel.send('Hello Traveler!');
        }
        else if (msg.content.startsWith('*restart') || msg.content.startsWith('*reset')) {
            restart(msg, saveData);
        }
        else if (msg.content.startsWith('*save') || msg.content.startsWith('*saving')) {
            save(msg, saveData);
        }
        else if (msg.content.startsWith('*wish')) {
            wish(msg);
        }
    }
});

client.login(process.env.TOKEN);