
const { Client, Intents, Interaction } = require('discord.js');
const { registerCommands, registerEvents, registerSlashCommands } = require('./utils/registry');
const config = require('../slappey.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.GUILD_SCHEDULED_EVENTS], partials: ['CHANNEL'] });
const DataBaseMongo = require('./mongo');
require('./slash-register')();
let commands = require('./slash-register').commands;
console.log(commands);
const { MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
const { MessageCollector, Collector } = require('discord.js');
const TicketClaimss = require('./schemas/ticketclaim');





(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(config.token);
  DataBaseMongo.init();
})();



client.on('ready', () => {
  let commands = client.application.commands;

  client.user.setPresence({ status: 'dnd', activity: { name: `Coming Soon...`, type: 'WATCHING' } });
})




client.on('guildCreate', guild => {
  const defaultChannel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has(Permissions.FLAGS.SEND_MESSAGES))


  const welcome = new MessageEmbed()
    .setTitle('Setup')
    .setDescription('Thank you for adding SkyBlox Systems Mental Health bot. Our goal is to help everyone mental health. To list the commands you can use, please use /help')
    .setColor('#f6f7f8')


  defaultChannel.send({ embeds: [welcome] })

})




client.on('interactionCreate', interaction => {
  if (!interaction.isCommand) return;
  let name = interaction.commandName;
  let options = interaction.options;

  let commandMethod = commands.get(name);
  if (commandMethod) {
    commandMethod(client, interaction)

  }
})

client.on("messageCreate", msg => {
  if (msg.partial) {
    // Never triggers
    console.log(`Received partial message- ${msg.id}`);
    return;
  }

  console.log(msg.content);
  console.log(msg.author.id);

  TicketClaimss.findOne({ TicketIDs: msg.content }, async (err, data) => {
    if (err) throw err;
    if (data) {
      if (data.id === msg.author.id) {
        if (data.ClaimUserID === '') {
          msg.reply('Your ticket has not been claimed by anyone.')
        } else {
          msg.reply('Please type out on what you want to send')

          const Filter40 = (m31) => m31.author.id == msg.author.id
          const Collector40 = new MessageCollector(msg.channel, { filter: Filter40, max: 1 });

          Collector40.on('collect', m32 => {
            msg.channel.send('Message sent!')
          })

          Collector40.on('end', m33 => {
            const senddmmessage = new MessageEmbed()
              .setTitle(`New reply from ${msg.author.tag}`)
              .setDescription(`Please use the command **/ticketreply message:** to reply to this message. Remember that this is a ${data.Topic} ticket.`)
              .addField('Ticket reply:', `${m33.first().content}`, true)
              .setTimestamp()
              .setFooter({ text: `user id: ${msg.author.id}` });

            client.channels.cache.get(data.ChannelID).send({ embeds: [senddmmessage] })
          })

        }

      }
    }
  })

});