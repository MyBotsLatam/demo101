import { BotFrameworkAdapter, TurnContext } from 'botbuilder';
import * as restify from 'restify';
import { EchoBot } from './bot';

// Create HTTP server.
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(`\n${server.name} listening to ${server.url}`);
  console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator');
  console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
});

const adapter = new BotFrameworkAdapter({
  appId: '',
  appPassword: ''
});

adapter.onTurnError = async (context, error) => {
  console.error(error);
  await context.sendActivity('Ups algo salio mal');
};

const bot = new EchoBot();

// Listen for incoming requests.
server.post('/api/messages', (req, res) => {
  adapter.processActivity(req, res , async (context: TurnContext) => {
    await bot.run(context);
  });
});
