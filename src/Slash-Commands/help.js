const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');

module.exports.data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Help Command');

module.exports.run = (client, interaction) => {

    const main = new Discord.MessageEmbed()
        .setTitle('⚙ Main')
        .addField('/invite', 'Invite to the server')
        .addField('/list', 'List how many Mental health sorted out')
        .setColor('#58b9ff')
        .setTimestamp()

    const support = new Discord.MessageEmbed()
        .setTitle('📞 Support')
        .addField(`/ticket urgent:`, 'Urgent mental health support')
        .addField(`/ticket normal:`, 'Normal mental health support')
        .addField('/ticket advise:', 'Adivse for your mental health')
        .addField('/helpine', 'List of helpines for call service')
        .setColor('#58b9ff')
        .setTimestamp()

    const Moderator = new Discord.MessageEmbed()
        .setTitle('⚙️ Support admins')
        .addField(`/close`, 'Close ticket')
        .addField(`/email`, 'Email the user via skyblox systems email system')
        .addField(`/warn`, 'warn user in the server')
        .setColor('#58b9ff')
        .setTimestamp()


    const button1 = new Discord.MessageButton()
        .setCustomId("previousbtn")
        .setLabel("Previous")
        .setStyle("DANGER");

    const button2 = new Discord.MessageButton()
        .setCustomId("nextbtn")
        .setLabel("Next")
        .setStyle("SUCCESS");

    const pages = [
        main,
        support,
        Moderator,
    ]

    const buttonList = [button1, button2];



    const timeout = '120000';

    pagination(interaction, pages, buttonList, timeout)
    interaction.reply({ content: 'help' })

}