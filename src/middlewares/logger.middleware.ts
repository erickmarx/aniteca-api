import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  forbiddenWords = ['password'];
  ignoreRoutes = ['v1/health'];

  #hideWords(request: Request) {
    for (const word of this.forbiddenWords) {
      if (request.body[word]) Object.assign({}, request.body)[word] = 'HIDDEN';
    }
    return request;
  }

  use(request: Request, response: Response, next: CallableFunction): void {
    if (this.ignoreRoutes.find((find) => find === request.params[0])) {
      next();
      return;
    }
    const infos = {
      method: request.method,
      path: `${request.headers.host}/${request.params[0]}`,
      body: JSON.stringify(this.#hideWords(request).body),
    };
    const currentDate = new Date();
    console.log();
    console.dir(
      `[REQUEST] ${`${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()} => ${
        infos.method
      } ${infos.path}`}`,
    );

    if (infos.body !== JSON.stringify({})) {
      console.dir(`#Body: ${infos.body}`);
    }
    const originalSendFunc = response.send.bind(response);
    let infoBody = null;
    response.send = (body) => {
      infoBody = body;
      return originalSendFunc(body);
    };
    response.on('finish', () => {
      console.log();
      console.dir(
        `[RESPONSE]: ${response.statusCode} => ${response.statusMessage}`,
      );
      console.dir(`#${infoBody}`);
      console.dir(
        `--- Complete time: ${
          new Date().getTime() - currentDate.getTime()
        } ms ---`,
      );
    });
    next();
  }
}
