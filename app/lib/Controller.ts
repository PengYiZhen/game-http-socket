import express from 'express'
export interface PyzContext {
    req: express.Request,
    res: express.Response,

}
export class Controller {
    name: string;
    constructor(ctx: PyzContext) {
      this.name = 'Controller';
    }

}
