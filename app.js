// Require the necessary discord.js classes
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { token, dataUsername } = require('./config.json');

let dataId = [];
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.DirectMessages,
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildBans,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMembers], 'partials': [Partials.Channel] });

// When the client is ready, run this code (only once)
client.once('ready', async () => {
	console.log('Ready!');
	const guild = await client.guilds.fetch('945877953147969586');
	await guild.members.fetch();

	const channel = await guild.channels.fetch('966618200810881024');
	const userIds = {};

	for (const [, guildMember] of channel.members) {
		// console.log(guildMember);
		console.log(`${guildMember.user.username}#${guildMember.user.discriminator} (${guildMember.id})`);
		userIds[`${guildMember.user.username}#${guildMember.user.discriminator}`] = guildMember.id;
	}
	console.log(userIds);

	dataId = dataUsername.map(list => {
		const idList = [];
		for (const key in list) {
			if (Object.hasOwnProperty.call(list, key)) {
				const name = list[key];

				idList.push(userIds[name]);
			}
		}
		return idList;
	});
	console.log(dataId);
});

client.on('messageCreate', async (msg) => {
	try {
		const message = msg.content.toLowerCase();
		// console.log(message);

		const userId = msg.author.id;
		// console.log(userId);

		if (message.startsWith('i have done my pyxis safe task')) {
			const listLinkedId = dataId.find(element => element.find(e => e == userId));
			let replyMsg = 'It\'s your turn, guys!!! ';
			if (listLinkedId.includes(userId)) {
				for (const user in listLinkedId) {
					if (Object.hasOwnProperty.call(listLinkedId, user)) {
						const el = listLinkedId[user];
						if (el == userId) continue;
						replyMsg = replyMsg.concat(`<@${el}> `);
					}
				}
			}

			// console.log(replyMsg);

			msg.reply(replyMsg);
		}
	}
	catch (error) {
		console.log(`${error.name}: ${error.message}`);
	}
});

// Login to Discord with your client's token
client.login(token);
