const { Shard } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');
const { BotVersions } = require('../../../slappey.json')

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run(client) {
    const activities = [
      `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users!`,
      `Support for users`
    ];

    let i = 0;
    // setInterval(() => client.user.setActivity(`/ticket | ${activities[i++ % activities.length]}`, { type: 'WATCHING' }), 15000);
  }
}