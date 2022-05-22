const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const fs = require('fs')
const { sendMail } = require('send-email-api')
const MainDatabase = require('../schemas/TicketData');



module.exports.data = new SlashCommandBuilder()
    .setName('database')
    .setDescription('Email a user')
    .addStringOption(option =>
        option.setName('category')
            .setDescription('The main category')
            .setRequired(true)
            .addChoice('update', 'update')
            .addChoice('install', 'install'))
    .addStringOption(option =>
        option.setName('supportid')
            .setDescription('The mental health support ID (not required)')
            .setRequired(false))
    .addStringOption(option =>
        option.setName('ticketclaimid')
            .setDescription('The mental health Ticket Claim Channel ID (not required)')
            .setRequired(false))
    .addStringOption(option =>
        option.setName('ticketlogsid')
            .setDescription('The mental health Ticket logs Channel ID (not required)')
            .setRequired(false))
    .addStringOption(option =>
        option.setName('transcriptid')
            .setDescription('The mental health Ticket transcript Channel ID (not required)')
            .setRequired(false));


module.exports.run = (client, interaction) => {

    const categorys = interaction.options.getString('category');
    const IDSupport = interaction.options.getString('supportid');
    const IDClaim = interaction.options.getString('ticketclaimid');
    const IDLogs = interaction.options.getString('ticketlogsid');
    const IDTranscript = interaction.options.getString('transcriptid');

    if (interaction.user.id !== '406164395643633665') {
        interaction.reply('This command can only be run by the bot owner.')
    } else {
        if (categorys === 'update') {
            interaction.reply('No update found.')
        }
        if (categorys === 'install') {
            interaction.reply('Hold on, we are installing the database.')

            MainDatabase.findOne({ BotOwner: interaction.user.id }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    setTimeout(() => {
                        interaction.channel.send('There is already data.')
                    }, 3000);
                } else {
                    data = new MainDatabase({
                        BotOwner: interaction.user.id,
                        SupportServer: IDSupport,
                        TicketClaimID: IDClaim,
                        TicketLogsID: IDLogs,
                        TranscriptsLogsID: IDTranscript,
                        OpenTickets: '0',
                        ClosedTickets: '0',
                        AmountTickets: '0',
                    })
                    data.save()
                    setTimeout(() => {
                        interaction.channel.send('Database has been installed within all servers.')

                    }, 3000);
                }
            })
        }

    }


}