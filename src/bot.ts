import { ActivityHandler, TurnContext } from 'botbuilder';

export class EchoBot extends ActivityHandler {

  constructor() {
    super();

    this.onMessage(async (context: TurnContext, next) => {
      const text = context.activity.text;
      if (text === '1234') {
        throw new Error('lanzando un error');
      }
      await context.sendActivity(`Usted dijo: ${text}`);
      await next();
    });

    this.onMembersAdded(async (context: TurnContext, next) => {
      const membersAdded = context.activity.membersAdded;
      for (const member of membersAdded) {
        if (member.id !== context.activity.recipient.id) {
          await context.sendActivity('Bienvenido');
        }
      }
      await next();
    });
  }
}
