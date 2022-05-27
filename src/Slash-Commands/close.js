const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const bot = require('discord.js');
const discord = require('discord.js');
const fs = require('fs').promises;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM();
const document = dom.window.document;
const mongo = require('../mongo');
const ClaimTicket = require('../schemas/ticketclaim')
const MainDatabase = require('../schemas/TicketData')
const { mainModule } = require('process');
const { response } = require('express');

module.exports.data = new SlashCommandBuilder()
    .setName('close')
    .setDescription('close Command')


module.exports.run = (client, interaction) => {

    ClaimTicket.findOne({ ChannelID: interaction.channel.id }, async (err200, data200) => {
        if (err200) throw err200;
        if (data200) {
            if (data200.ClaimUserID === "") {


                const NoClaimer = new MessageEmbed()
                    .setTitle('Error')
                    .setDescription('No staff member has not claimed the ticket. This ticket can not be closed')

                interaction.reply({ embeds: [NoClaimer] })
            } else {

                function makeURL(length) {
                    var result = '';
                    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    var charactersLength = characters.length;
                    for (var i = 0; i < length; i++) {
                        result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    }
                    return result;
                }
                const generators = makeURL(20)

                const ticketembed = new MessageEmbed()
                    .setColor('#f6f7f8')
                    .setTimestamp()
                    .setTitle(`Ticket`)
                    .setDescription(`<@${interaction.user.id}>, are you sure you want to close this ticket? **yes**. If not, it will cancel the command within 10 seconds.`)

                const closed = new MessageEmbed()
                    .setColor('#f6f7f8')
                    .setTimestamp()
                    .setTitle(`Ticket`)
                    .setDescription(`You have closed the following ticket: ${interaction.channel.name}.`)

                const Logs = new MessageEmbed()
                    .setColor('#f6f7f8')
                    .setTimestamp()
                    .setTitle('Ticket-logs')
                    .setDescription(`<@${interaction.user.id}> has close the following ticket: ${interaction.channel.name} successfully. \n\n All tickets are removed of our server within 24 hours.`)

                const notclosed = new MessageEmbed()
                    .setColor('#f6f7f8')
                    .setTimestamp()
                    .setTitle(`Ticket`)
                    .setDescription(`Close cancelled.`)

                const closing = new MessageEmbed()
                    .setColor('#f6f7f8')
                    .setTimestamp()
                    .setTitle(`Ticket`)
                    .setDescription(`Your ticket will be closed in 5 seconds`)
                    .setFooter(`Making a transcript....`)

                if (!interaction.channel.name.startsWith("ticket-")) return interaction.channel.send("This is not a valid ticket")
                if (!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.channel.send("You need MANAGE_CHANNELS permission to use this command")
                interaction.reply({ embeds: [ticketembed] })
                    .then((m) => {
                        interaction.channel.awaitMessages({
                            filter: response => response.content == "yes",
                            max: 1,
                            time: 10000,
                            errors: ['time']
                        }).then(() => {
                            interaction.channel.send({ embeds: [closing] })

                            setTimeout(() => {
                                ClaimTicket.findOne({ ChannelID: interaction.channel.id }, async (err, data) => {
                                    if (err) throw err;
                                    if (data) {

                                        const DMTicketCreatorClosed = new MessageEmbed()
                                            .setColor('#f5f5f5')
                                            .setTimestamp()
                                            .setTitle(`Ticket`)
                                            .setDescription(`A mental health crew has closed your ticket. If you think this is a mistake, please contact a higher role member.`)

                                        const DMTicketClaimClosed = new MessageEmbed()
                                            .setColor('#f5f5f5')
                                            .setTimestamp()
                                            .setTitle(`Ticket`)
                                            .setDescription(`You have closed the following ticket-${data.ChannelID} for the following user <@${data.id}>.`)


                                        const ticketttcreator = client.users.cache.get(data.id)
                                        ticketttcreator.send({ embeds: [DMTicketCreatorClosed] })

                                        const ticketttClaimer = client.users.cache.get(`${data.ClaimUserID}`)
                                        ticketttClaimer.send({ embeds: [DMTicketClaimClosed] })


                                    }

                                    MainDatabase.findOne({ SupportServer: '977861250300121128' }, async (err30, data30) => {
                                        if (err30) throw err30;
                                        if (data30) {

                                        }
                                    })
                                    interaction.channel.delete()

                                    const SupportLogs = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-logs" && ch.type == "GUILD_TEXT")
                                    const TranscriptLogs = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "transcripts" && ch.type == "GUILD_TEXT")

                                    const UserName = client.users.cache.find(user => user.id === data.id)
                                    console.log(UserName)

                                    SupportLogs.send({ embeds: [Logs] })

                                    const CloseEmbed = new MessageEmbed()
                                        .setTitle('Transcript')
                                        .addField('Transcript', `Disabled in v3.0 due to issues`)
                                        // .addField('Transcript', `[Click Me](https://shard1.ticketbots.tk/Tickets/${message.guild.id}/${generators}.html)`)
                                        .addField('Time', `${data.Time}`)
                                        .addField('Claim User', `<@${data.ClaimUserID}>`)

                                    const discordTranscripts = require('discord-html-transcripts');

                                    const channelsss = interaction.channel;
                                    const attachment = await discordTranscripts.createTranscript(channelsss, {
                                        limit: -1, // Max amount of messages to fetch.
                                        returnBuffer: false, // Return a buffer instead of a MessageAttachment 
                                        fileName: `${generators}.html` // Only valid with returnBuffer false. Name of attachment. 
                                    });

                                    TranscriptLogs.send({ embeds: [CloseEmbed] })
                                    TranscriptLogs.send({ files: [attachment] })

                                    setTimeout(() => {
                                        const EmailSent = new MessageEmbed()
                                            .setTitle('Email Sent!')

                                        interaction.user.send({ embeds: [EmailSent] })

                                    }, 5000);

                                    const { sendMail } = require('send-email-api')
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

                                    let channelss = client.channels.cache.get('977877525776695326');
                                    channelss.messages.fetch({ limit: 1 }).then(messages => {
                                        let lastMessage = messages.first();
                                        const attachment = lastMessage.attachments.first();
                                        const url = attachment ? attachment.url : null;
                                        const emailData = {
                                            to: [data.Email],
                                            subject: 'Transcript',
                                            text: `Thank you for using our mental health system via discord. I hope we will see you soon. Below, we have attached a html file for the transcript. Enjoy your rest of your day / evening. Transcript can be find here: ${url}`,
                                        }

                                        sendMail(emailData, emailConfig)
                                    })


                                    setTimeout(() => {
                                        ClaimTicket.findOneAndDelete({ ChannelID: data.ChannelID }, async (err02, data02) => {
                                            if (err02) throw err02;
                                            if (data02) {
                                                console.log(`${data.id} ticket has been removed from the database`)
                                            }
                                        })
                                    }, 5000);

                                    MainDatabase.findOneAndUpdate({ SupportServer: '977861250300121128' }, { OpenTickets: - 1 }, async (err4, data4) => {
                                        if (err4) throw err;
                                        if (data4) {
                                            data4.save()
                                        }
                                    })

                                    MainDatabase.findOneAndUpdate({ SupportServer: '977861250300121128' }, { ClosedTickets: +1 }, async (err5, data5)=> {
                                        if (err5) throw err;
                                        if (data5) {
                                            data5.save()
                                        }
                                    })
                                })



                            }, 5000);
                        }).catch(() => {
                            m.edit({ embeds: [notclosed] })
                        })
                    }).catch(() => {
                        m.edit({ embeds: [notclosed] })
                    })

            }
        }







    })

}