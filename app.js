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

		const userId = msg.author.tag;
		
		if (message.startsWith('ping my partners')) {
			const listLinkedId = data.find(element => element.find(e => e === userId));
			let replyMsg = 'It\'s your turn, guys!!! ';
			if (listLinkedId.includes(userId)) {
			for (const user in listLinkedId) {
					if (Object.hasOwnProperty.call(listLinkedId, user)) {
						const el = listLinkedId[user];
						if (el == userId) continue;
						let f = client.users.cache.find(userf => userf.tag === el);
						replyMsg = replyMsg.concat(`<${f}> `);
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
