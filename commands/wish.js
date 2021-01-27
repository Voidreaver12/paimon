const { MessageAttachment } = require('discord.js');

const wish = (msg) => {
    msg.channel.send(`${msg.author} wished Debate Club!`, new MessageAttachment('./wishes/Debate_Club.png'));
};

module.exports = wish;