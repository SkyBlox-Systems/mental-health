const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const ClaimTicket = require('../schemas/ticketclaim');
const { findOneAndUpdate } = require('../schemas/ticketclaim');
const { MessageEmbed } = require('discord.js');
var currentDateAndTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });

module.exports.data = new SlashCommandBuilder()
    .setName('claim')
    .setDescription('claim ticket')
    .addStringOption(option =>
        option.setName('ticketid')
            .setDescription('Ticket ID for ticket')
            .setRequired(true));

module.exports.run = (client, interaction) => {
    const claimit = interaction.options.getString('ticketid')

    ClaimTicket.findOne({ TicketIDs: claimit }, async (err, data) => {
        if (err) throw err;
        if (data) {
            const user1 = data.id

            data = ClaimTicket.findOneAndUpdate({ TicketIDs: claimit }, { ClaimUserID: interaction.user.id }, async (err2, data2) => {
                if (err2) throw err2;
                if (data2) {
                    data2.save()


                    const TicketClaimed = new MessageEmbed()
                        .setTitle('Ticket Claimed!')
                        .setDescription(`<#${data2.ChannelID}> has been claimed by <@${interaction.user.id}> You should off be given the permission to send the message in the ticket!`)

                    const TicketClaimedDM = new MessageEmbed()
                        .setTitle('Ticket Claimed!')
                        .setDescription(`Your mental health ticket  has been claimed by a mental health crew! For you to reply, you need to reply to our DMs with your ticket id ${data2.TicketIDs}`)

                    //  if (message.author.id !== data2.ClaimUserID) {
                    //    const AlreadyClaimed = new MessageEmbed()
                    //      .setTitle('Ticket already claimed!')
                    //      .setDescription(`This ticket has already been claimed by <@${data2.ClaimUserID}>`)

                    //    return message.channel.send(AlreadyClaimed)
                    //  }

                    const user2 = data2.id


                    interaction.reply({ embeds: [TicketClaimed] })
                    const sendtouser = client.users.cache.get(`${user1}`)
                    sendtouser.send({ embeds: [TicketClaimedDM] })

                    const MainChan = interaction.guild.channels.cache.get(data2.ChannelID)

                    MainChan.permissionOverwrites.create(interaction.user.id, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        ATTACH_FILES: true,
                        MANAGE_CHANNELS: true,
                    })






                }

            })
        } else {
            interaction.reply('The ID you put has not open a ticket or an invaild id')
                .catch(err => console.log(err))
        }

    })

}