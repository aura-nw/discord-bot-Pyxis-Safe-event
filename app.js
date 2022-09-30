// Require the necessary discord.js classes
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { token, data } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.DirectMessages,
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildBans,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent], 'partials': [Partials.Channel] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', async (msg) => {
	try {
		const message = msg.content.toLowerCase();

		const userId = msg.author.username;
		const userIdev = msg.author.id;
		console.log(userId);
		console.log(userIdev);

		if (message.startsWith('i have done my pyxis safe task')) {
			const listLinkedId = data.find(element => element.find(e => e == userId));
			let replyMsg = 'It\'s your turn, guys!!! ';
			if (listLinkedId.includes(userId)) {
				for (const user in listLinkedId) {
					if (Object.hasOwnProperty.call(listLinkedId, user)) {
						const el = listLinkedId[user];
						if (el == userId) continue;
						let id = client.users.cache.find(userf => userf.username == el).id;
						replyMsg = replyMsg.concat(`<@${id}> `);
					}
				}
			}

			replyMsg = replyMsg.concat('. If you have completed, please ignore this message.');
			msg.reply(replyMsg);
		}
	}
	catch (error) {
		console.log(`${error.name}: ${error.message}`);
	}
});

// Login to Discord with your client's token
client.login(token);
