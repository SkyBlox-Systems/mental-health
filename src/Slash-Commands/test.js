const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const fs = require('fs')
const { MessageEmbed } = require('discord.js')
const MainDatabase = require('../schemas/TicketData')



module.exports.data = new SlashCommandBuilder()
    .setName('test')
    .setDescription('testing')


module.exports.run = (client, interaction) => {
    if (interaction.user.id !== '406164395643633665') {
        interaction.reply('You can not use this command!')
    } else {
        let channel = client.channels.cache.get('977877525776695326');
        channel.messages.fetch({ limit: 1 }).then(messages => {
            let lastMessage = messages.first();
            const attachment = lastMessage.attachments.first();
            const url = attachment ? attachment.url : null;
            console.log(url)
        })
    }




}