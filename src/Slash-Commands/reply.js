const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const fs = require('fs')
const { MessageEmbed } = require('discord.js')
const MainDatabase = require('../schemas/TicketData')
const ClaimTicket = require('../schemas/ticketclaim')



module.exports.data = new SlashCommandBuilder()
    .setName('ticketreply')
    .setDescription('Ticket Reply Command')
    .addStringOption(option =>
        option.setName('message')
            .setDescription('Require the message you want to send')
            .setRequired(true));


module.exports.run = (client, interaction) => {
    if (interaction.guildId !== '977861250300121128') {

        interaction.reply('This command can only be used on the Mental Health support team server.')
    } else {

        const messageforuser = interaction.options.getString('message');

        ClaimTicket.findOne({ ChannelID: interaction.channel.id }, async (err, data) => {
            if (err) throw err;
            if (data) {

                interaction.reply(`The message has been sent to ${data.id}`)
                const sendtouser = new MessageEmbed()
                    .setTitle(`A reply from a mental health crew`)
                    .setDescription(`For you to reply, please type out ${data.TicketIDs} in our DMs, and we further from there.`)
                    .addField('Ticket Reply:', `${messageforuser}`, true)
                    .setTimestamp()
                    .setFooter({ text: `user id: ${interaction.member.user.id}` });

                const ticketsend = client.users.cache.get(data.id)

                ticketsend.send({ embeds: [sendtouser] })

            } else {
                interaction.reply('No Ticket Found with this channel ID or you are not inside a ticket.')
            }
        })

    }




}