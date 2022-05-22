const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');



module.exports.data = new SlashCommandBuilder()
    .setName('helpline')
    .setDescription('helpine')
    .addStringOption(option =>
        option.setName('category')
            .setDescription('The main category')
            .setRequired(true)
            .addChoice('ALL', 'all')
            .addChoice('UK', 'uk')
            .addChoice('US', 'us'))

module.exports.run = (client, interaction) => {
    const HelpLineChoice = interaction.options.getString('category');

    if (HelpLineChoice === 'all') {
        const All1 = new Discord.MessageEmbed()
            .setTitle('Help line')
            .addField('Algeria', '0021 3983 2000 58')
            .addField('Argentina', '5275-1135')
            .addField('Australia', '13 11 14')
            .addField('Austria', '112')
            .addField('Azerbaijan', '112 or 510-66-36')
            .addField('The Bahamas', '322-2763')
            .addField('Bahrain', '999')
            .addField('Bangladesh', '999 (No mental health number)')
            .addField('Barbados', 'No mental health number')
            .addField('Belarus', '8 801 100 8 801')

        const All2 = new Discord.MessageEmbed()
            .setTitle('Help line')
            .addField('Belgium', '1813')
            .addField('Bosnia and Herzegovina', '0800-300303')
            .addField('Bolivia', '75288084')
            .addField('Botswana', '3911270')
            .addField('Brazil', '188')
            .addField('Brunei', '145')
            .addField('Bulgaria', '112')
            .addField('Canada', '45645')
            .addField('Chile', '600 360 7777')
            .addField('China', '021–64387250.')

        const All3 = new Discord.MessageEmbed()
            .setTitle('Help line')
            .addField('Colombia', '106')
            .addField('Costa Rica', '(506) 2272-3774')
            .addField('Croatia', '48 33 888')
            .addField('Cuba', 'No mental health number')
            .addField('Cyprus', '8000 7773')
            .addField('Czech Republic', '731 197 477')
            .addField('Denmark', '70 201 201')
            .addField('Ecuador', 'No mental health number')
            .addField('Egypt', '762 2381')
            .addField('Estonia', '021–64387250')

        const All4 = new Discord.MessageEmbed()
            .setTitle('Help line')
            .addField('Fiji', '132454')
            .addField('Finland', '09 2525 0111')
            .addField('France', '01 45 39 40 00')
            .addField('Germany', '0800 111 0 111')
            .addField('Georgia', 'No mental health number')
            .addField('Ghana', '2332 444 71279')
            .addField('Greece', '1056')
            .addField('Greenland', '134')
            .addField('Guyana', '623-4444')
            .addField('Hong Kong', '2389 2222')

        const All5 = new Discord.MessageEmbed()
            .setTitle('Help line')
            .addField('Hungary', '116-111')
            .addField('Iceland', '1717')
            .addField('India', '1800-599-0019')
            .addField('Indonesia', '150-0454')
            .addField('Iran', '1480')
            .addField('Ireland', '50808')
            .addField('Israel', '076-88444-00')
            .addField('Italy', '800 86 00 22')
            .addField('Japan', 'No mental health number')
            .addField('Jordan', '110')

        const All6 = new Discord.MessageEmbed()
            .setTitle('Help line')
            .addField('Korea', '1577-0199')
            .addField('Kenya', '+254 20 3000378')
            .addField('Kosovo', '080012345')
            .addField('Latvia', '+371 67222922')
            .addField('Lebanon', '1564')
            .addField('Liberia', '6534308')
            .addField('Lithuania', '8 800 28888')
            .addField('Luxembourg', '+352 45 45 45')
            .addField('Malaysia', '016-720 1495')
            .addField('Malta', '179')

        const All7 = new Discord.MessageEmbed()
            .setTitle('Help line')
            .addField('Mauritius', '+230 800 93 93')
            .addField('Mexico', '(55) 5259-8121')
            .addField('Morocco', '+212 (6) 62 58 95 7')
            .addField('Netherlands', '113')
            .addField('New Zealand', '0800 72 66 66')
            .addField('Norway', '22 40 00 40')
            .addField('Pakistan', '0311 7786264')
            .addField('Philippines', '89 527 00 00')
            .addField('Portugal', '800 209 899')
            .addField('Romania', '0800 0800 20')

        const All8 = new Discord.MessageEmbed()
            .setTitle('Help line')
            .addField('Russia', '(495) 625 3101')
            .addField('Serbia', '011 7777-000')
            .addField('Singapore', '1-767')
            .addField('Slovakia', '051')
            .addField('Slovenia', '(01) 520-99-00')
            .addField('South Africa', '024')
            .addField('Sri Lanka', '011 057 2222662')
            .addField('Saint Vincent and the Grenadines', '(784) 456 1044')
            .addField('Sudan', '(249) 11-555-253')
            .addField('Sweden', '90101')

        const All9 = new Discord.MessageEmbed()
            .setTitle('Help line')
            .addField('Switzerland', '143')
            .addField('Taiwan', '1925')
            .addField('Thailand', '1323')
            .addField('Tonga', '23000')
            .addField('Trinidad and Tobago', '(868) 645 2800s')
            .addField('Turkey', '183')
            .addField('Ukraine', '7333')
            .addField('United Arab Emirates', '920033360')
            .addField('United Kingdom', '116 123')
            .addField('United States', '1-800-273-8255')
            .addField('Uruguay', '08000767')

        const button1 = new Discord.MessageButton()
            .setCustomId("previousbtn")
            .setLabel("Previous")
            .setStyle("DANGER");

        const button2 = new Discord.MessageButton()
            .setCustomId("nextbtn")
            .setLabel("Next")
            .setStyle("SUCCESS");

        const pages = [
            All1,
            All2,
            All3,
            All4,
            All5,
            All6,
            All7,
            All8,
            All9
        ]

        const buttonList = [button1, button2];



        const timeout = '120000';

        pagination(interaction, pages, buttonList, timeout)
        interaction.reply({ content: 'Help line' })

    }

    if (HelpLineChoice === 'uk') {
        const UKhelpines = new Discord.MessageEmbed()
        .setTitle('UK helpines')
        .addField('NHS mental health', '111')
        .addField('Samaritans', '116 123')
        .addField('SANEline', '0300 304 7000')
        .addField('Mind', '0300 123 3393')

        interaction.reply({ embeds: [UKhelpines]})
    }

    if (HelpLineChoice === 'us') {
        const UShelplines = new Discord.MessageEmbed()
        .setTitle('US helpines')
        .addField('National Help Service', '911')
        .addField('Crisis Text Line', '741741')
        .addField('NAMI HelpLine', '6264')

        interaction.reply({ embeds: [UShelplines]})
    }


}