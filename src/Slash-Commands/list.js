const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const fs = require('fs')
const { MessageEmbed } = require('discord.js')
const MainDatabase = require('../schemas/TicketData')



module.exports.data = new SlashCommandBuilder()
    .setName('list')
    .setDescription('list a of the mental health')


module.exports.run = (client, interaction) => {

    MainDatabase.findOne({ SupportServer: '977861250300121128' }, async (err, data) => {
        if (err) throw err;
        if (data) {
            const mainembed = new MessageEmbed()
            .setTitle('Mental health list')
            .setDescription('Below, you can see how much our staff team has done.')
            .addField('Open Tickets', `${data.OpenTickets}`, true)
            .addField('Closed Tickets', `${data.ClosedTickets}`, true)
            .addField('Amount of tickets we have done', `${data.AmountTickets}`)

            interaction.reply({ embeds: [mainembed]})
        }
    })





}