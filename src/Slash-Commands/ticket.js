const { SlashCommandBuilder } = require('@discordjs/builders');
const { Discord, Channel } = require('discord.js');
const { MessageEmbed } = require('discord.js');
var currentDateAndTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
const ClaimTicket = require('../schemas/ticketclaim')
const MainDatabase = require('../schemas/TicketData');



var today = new Date();
var dd = String(today.getDate());

module.exports.data = new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Ticket Command')
    .addStringOption(option =>
        option.setName('category')
            .setDescription('The main category')
            .setRequired(true)
            .addChoice('urgent', 'urgent')
            .addChoice('normal', 'normal')
            .addChoice('advise', 'advise'))
    .addStringOption(option =>
        option.setName('email')
            .setDescription('We will require your email, just incase something happens')
            .setRequired(true));

module.exports.run = (client, interaction) => {


    ClaimTicket.findOne({ id: interaction.user.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            const FoundData = new MessageEmbed()
                .setTitle('Data found')
                .setDescription('It seems like you already have a mental health ticket open. Please check your DMS.')
            interaction.reply({ embeds: [FoundData] })

        } else {
            const listt = interaction.options.getString('category');
            const emails = interaction.options.getString('email');

            function makeURL(length) {
                var result = '';
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for (var i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }


            const generator = makeURL(20)
            const generator2 = makeURL(5)
            const user = interaction.user.id;
            const name = "ticket-" + generator2;

            const foundData = new MessageEmbed()
                .setTitle('Ticket open')
                .setDescription('It seems like you already have a mental health ticket open. Please check ur DMS.')

            const open = new MessageEmbed()
                .setColor('#f6f7f8')
                .setTimestamp()
                .setTitle(`Ticket`)
                .addField('Information', `<@${interaction.user.id}> I have open a ticket for you!`, true)

            const Warning = new MessageEmbed()
                .setTitle('⚠ Warning ⚠')
                .setDescription(`We have your email **${emails}** just incase if we need to contact you for further info. Your email will be removed out of our system after this ticket is closed.`)


            const DmPerson = new MessageEmbed()
                .setColor('#f6f7f8')
                .setTimestamp()
                .setTitle('Ticket open')
                .setDescription(`You have open a mental health. You can send a message to your ticket by replying to our DMs with your ticketID: ${generator}`)
                .addField('TicketID', `${generator}`, true)

            const thankyou = new MessageEmbed()
                .setColor('#f6f7f8')
                .setTimestamp()
                .setTitle('Ticket')
                .setDescription('To reply to this user ticket, please use the following command `/ticketreply message:` ')
                .addField('Information', `Mental Health reason`, true)
                .addField('User', `<@${interaction.user.id}>`, true)
                .addField('Email', `${emails}`, true)
                .addField('Ticket Id', `${generator}`, true)

            const newguild = client.guilds.cache.get('977861250300121128');


            if (listt === 'urgent') {
                ClaimTicket.findOne({ id: user }, async (err1, data1) => {
                    if (err1) throw err;
                    if (data1) {
                        await interaction.reply({ embeds: [foundData] })
                    } else {

                        newguild.channels.create(name).then(async (chan) => {
                            chan.setTopic(`Urgent Mental Health. Your ticket has been open as from: ${currentDateAndTime} UTC.`)
                            chan.permissionOverwrites.create(newguild.roles.everyone, {
                                SEND_MESSAGES: false,
                                VIEW_CHANNEL: false
                            })

                            await interaction.reply({ embeds: [open] });
                            await interaction.user.send({ embeds: [Warning] })
                            setTimeout(() => {
                                interaction.user.send({ embeds: [DmPerson] })
                            }, 3000);
                            await chan.send({ embeds: [thankyou] }).then((m) => {
                                m.pin()
                            })
                            data1 = new ClaimTicket({
                                id: interaction.user.id,
                                TicketIDs: generator,
                                ServerID: interaction.guildId,
                                ChannelID: chan.id,
                                Topic: 'Urgent',
                                Time: currentDateAndTime,
                                Email: emails,
                                AddedUser: Array,
                                ClaimUserID: ""
                            })
                            data1.save()
                            const TicketClainCommandSend = newguild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-claim" && ch.type == "GUILD_TEXT")
                            const TicketSupportID = newguild.roles.cache.find(roles => roles.id === `977876493956964362`)
                            
                            
                            MainDatabase.findOneAndUpdate({ SupportServer: '977861250300121128' }, { OpenTickets: +1 }, async (err4, data4) => {
                                if (err4) throw err;
                                if (data4) {
                                    data4.save()
                                }
                            })
                            MainDatabase.findOneAndUpdate({ SupportServer:  '977861250300121128' }, { AmountTickets: +1 }, async (err5, data5) => {
                                if (err5) throw err;
                                if (data5) {
                                    data5.save()
                                }
                            })



                        })

                    }
                })
            }
            if (listt === 'normal') {
                ClaimTicket.findOne({ id: user }, async (err1, data1) => {
                    if (err1) throw err;
                    if (data1) {
                        await interaction.reply({ embeds: [foundData] })
                    } else {

                        newguild.channels.create(name).then(async (chan) => {
                            chan.setTopic(`Normal Mental Health. Your ticket has been open as from: ${currentDateAndTime} UTC.`)
                            chan.permissionOverwrites.create(newguild.roles.everyone, {
                                SEND_MESSAGES: false,
                                VIEW_CHANNEL: false
                            })

                            await interaction.reply({ embeds: [open] });
                            await interaction.user.send({ embeds: [Warning] })
                            setTimeout(() => {
                                interaction.user.send({ embeds: [DmPerson] })
                            }, 3000);
                            await chan.send({ embeds: [thankyou] }).then((m) => {
                                m.pin()
                            })
                            data1 = new ClaimTicket({
                                id: interaction.user.id,
                                TicketIDs: generator,
                                ServerID: interaction.guildId,
                                ChannelID: chan.id,
                                Topic: 'Normal',
                                Time: currentDateAndTime,
                                Email: emails,
                                AddedUser: Array,
                                ClaimUserID: ""
                            })
                            data1.save()
                            const TicketClainCommandSend = newguild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-claim" && ch.type == "GUILD_TEXT")
                            const TicketSupportID = newguild.roles.cache.find(roles => roles.id === `977876462134788106`)
                            TicketClainCommandSend.send(`${TicketSupportID} \n<@${interaction.user.id}> has open a normal mental health ticket! Please run /claim ticketid:${generator} to claim the ticket!`)

                            MainDatabase.findOneAndUpdate({ SupportServer: '977861250300121128' }, { OpenTickets: +1 }, async (err4, data4) => {
                                if (err4) throw err;
                                if (data4) {
                                    data4.save()
                                }
                            })
                            MainDatabase.findOneAndUpdate({ SupportServer:  '977861250300121128' }, { AmountTickets: +1 }, async (err5, data5) => {
                                if (err5) throw err;
                                if (data5) {
                                    data5.save()
                                }
                            })



                        })

                    }
                })
            }
            if (listt === 'advise') {
                ClaimTicket.findOne({ id: user }, async (err1, data1) => {
                    if (err1) throw err;
                    if (data1) {
                        await interaction.reply({ embeds: [foundData] })
                    } else {

                        newguild.channels.create(name).then(async (chan) => {
                            chan.setTopic(`Normal Mental Health. Your ticket has been open as from: ${currentDateAndTime} UTC.`)
                            chan.permissionOverwrites.create(newguild.roles.everyone, {
                                SEND_MESSAGES: false,
                                VIEW_CHANNEL: false
                            })

                            await interaction.reply({ embeds: [open] });
                            await interaction.user.send({ embeds: [Warning] })
                            setTimeout(() => {
                                interaction.user.send({ embeds: [DmPerson] })
                            }, 3000);
                            await chan.send({ embeds: [thankyou] }).then((m) => {
                                m.pin()
                            })
                            data1 = new ClaimTicket({
                                id: interaction.user.id,
                                TicketIDs: generator,
                                ServerID: interaction.guildId,
                                ChannelID: chan.id,
                                Topic: 'Advise',
                                Time: currentDateAndTime,
                                Email: emails,
                                AddedUser: Array,
                                ClaimUserID: ""
                            })
                            data1.save()
                            const TicketClainCommandSend = newguild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-claim" && ch.type == "GUILD_TEXT")
                            const TicketSupportID = newguild.roles.cache.find(roles => roles.id === `977876365040828446`)
                            TicketClainCommandSend.send(`${TicketSupportID} \n<@${interaction.user.id}> has open a advise mental health ticket! Please run /claim ticketid:${generator} to claim the ticket! You are suggested to give advise about what their mental health is about.`)

                            MainDatabase.findOneAndUpdate({ SupportServer: '977861250300121128' }, { OpenTickets: +1 }, async (err4, data4) => {
                                if (err4) throw err;
                                if (data4) {
                                    data4.save()
                                }
                            })
                            MainDatabase.findOneAndUpdate({ SupportServer:  '977861250300121128' }, { AmountTickets: +1 }, async (err5, data5) => {
                                if (err5) throw err;
                                if (data5) {
                                    data5.save()
                                }
                            })


                        })

                    }
                })
            }
        }
    })
}

