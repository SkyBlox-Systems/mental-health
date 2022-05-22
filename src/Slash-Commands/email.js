const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const fs = require('fs')
const { sendMail } = require('send-email-api')



module.exports.data = new SlashCommandBuilder()
    .setName('email')
    .setDescription('Email a user')
    .addStringOption(NotNeeded =>
        NotNeeded.setName('email')
            .setDescription('The email you was going to send')
            .setRequired(true))
    .addStringOption(NotNeeded =>
        NotNeeded.setName('title')
            .setDescription('The title of the email')
            .setRequired(true))
    .addStringOption(NotNeeded =>
        NotNeeded.setName('message')
            .setDescription('The message of the email')
            .setRequired(true));


module.exports.run = (client, interaction) => {
    if (interaction.guildId !== '977861250300121128') {

        interaction.reply('This command can only be used on the Mental Health support team server.')


    } else {
        const emails = interaction.options.getString('email');
        const titles = interaction.options.getString('title');
        const messagess = interaction.options.getString('message');

        const emailConfig = {
            options: {
                host: 'smtp.office365.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'support@skybloxsystems.com',
                    pass: '7xYNPAo8L4n#Cz33Re!eDh@KC9zo&c@QCRH@R!9p',
                }
            },
            from: 'support@skybloxsystems.com',
        }

        const emailData = {
            to: [emails],
            subject: titles,
            text: messagess,
        }

        sendMail(emailData, emailConfig)
        interaction.reply('Email sent')
    }


}