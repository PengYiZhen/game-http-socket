import { Controller } from "../lib/Controller";
import { PyzContext } from "../lib/Controller";
import { socketEvent } from "../io/socketEventConfig";
type JSON = string | any;
// 这个地方定义装饰器
export default class Home extends Controller {
    name: string
    constructor(props: any) {
       super(props);
       this.name = 'Home';
       
    }
    
    public async index(ctx: PyzContext): Promise<any> {
      ctx.res.send(`<p style="font-size: 20px; font-weight: 700;">welcome Pyz Socket-Http-Engines!</p>`)
    }

    public async doSome(ctx: PyzContext): Promise<JSON> {
      
      ctx.res.send({socket: {events: socketEvent}});

    }
    
} 