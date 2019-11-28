import { ActivityHandler, TurnContext } from 'botbuilder';

export class EchoBot extends ActivityHandler {

  constructor() {
    super();

    this.onMessage(async (context: TurnContext, next) => {
      const text = context.activity.text;
      await context.sendActivity(`Usted dijo: ${text}`);
      await next();
    });
  }
}
