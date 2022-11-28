import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import chalk from 'chalk';
import InitApplicationConfig from './ApplicationConfig';
import configDefault from '../config/config.default';
import path from 'path';
import PyzRouter from './Router';
import { controller, RegistryCompClass } from '../config/RegistryCompClass';
import { Controller } from './Controller';
import router from '../router';
import IoNameSpaceControl from '../io/IoNameSpaceControl';

interface HttpApplicationConfig {
    port?: number,
    host?: string,
}
type UrlPath = string;
type PathStr = string;
interface ApplicationCfDec {
    static?: {
        prefix?: UrlPath;
        dir?: PathStr;
    };
}
type Constructor<T = {}> = new (...args: any[]) => T;

export class Application {
   app: express.Express;
   server: http.Server;
   io: Server;
   serverConfig: HttpApplicationConfig;
   config?: ApplicationCfDec;
   controller!: controller;
   router: PyzRouter;

   constructor(serverConfig?: HttpApplicationConfig) {
      this.app = express();
      this.server = http.createServer(this.app); 
      this.io = new Server(this.server);
      this.config = <ApplicationCfDec>configDefault;
      this.serverConfig = {
        host: serverConfig?.host || '127.0.0.1', 
        port: serverConfig?.port || 8001,};
      this.router = new PyzRouter(this);  
      
   }
 
   public init(): Application {
    this.initControllers();
    this.initRouter();
    this.initIoNameSpace();
    this.app.use(express.static(path.join(
        InitApplicationConfig.static.dir, 
        InitApplicationConfig.static.prefix))); 
    // this.catch404();
    return this;
    
    
   }  

   public initControllers(): Application {
    let obj = {};
    for(let controller of RegistryCompClass) {
        let instanceControl = this.iniStanceController<Controller>(controller);
        Object.assign(obj, {[instanceControl.name]: instanceControl});
    }
    (<any>this.controller) = obj;
    return this;
   }

   public initRouter(): Application {
    router(this);
    return this;
   }

   public initIoNameSpace(): void {
    IoNameSpaceControl(this);
   }

   public catch404(): void {
    this.app.use(function(req: express.Request, res: express.Response) {
      //(Number(res.getHeader('content-length'))===0 || !res.getHeader('content-length')) && res.statusCode!==304
      if(res.statusCode === 404) {
        res.status(404);
        console.log(1212)
        res.send(`<p style="font-size: 50px; font-weight: 700;">${res.statusCode} NotFind</p>`)
      }
    });
   }

   public iniStanceController<T>(controllerConstructor: Constructor<T>): T {
    return new controllerConstructor();
   }

   public startApplication(): Application {
     this.init();
     this.devLog(`server on: http://${this.serverConfig.host}:${this.serverConfig.port}`, '#f0f')
     this.server.listen(this.serverConfig.port, this.serverConfig.host);
     return this; 
   }
   
   public devLog(str: string, color: ColorString='#FFFFFF', vars: any=''): void {
      if(process.env.npm_lifecycle_event==='dev') {
        console.log(chalk.hex(color+' %s').bgBlack(str), vars) 
      }
   }
}

type StaticDir = string;
type ColorString = string;

export interface PyzSeverConfig {
    port: string | number,
    host: string,
    static: StaticDir
}

export function app(config?: HttpApplicationConfig): Application { return new Application(config).startApplication(); }


