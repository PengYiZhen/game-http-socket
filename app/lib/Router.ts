import { Application } from "./Application";
/**
 * @RouterParams 为了方式函数签名的错误，使用接口重载
 */
interface RouterParams {
    (path: string, controller: Function): PyzRouter,
    (path: string, middle: Function, controller: Function): PyzRouter,
}

export default class PyzRouter {
    protected app: Application;
    constructor(app: Application) {
       this.app = app;
    }
    /**
     * 重载一个或多个参数  多态 | 接口签名
     * @param path 
     * @param middle 
     * @param controller 
     */
    public get: RouterParams = (path: string, middle?: Function, controller?: Function): PyzRouter =>  {

        this.app.app.get(path, (req, res, next)=>{
            if(middle) { //middle 可能就是Controller
                middle(req, res, next);
                next();
                if(controller) controller({req, res}); 
            }
        });

        return this;
    }
    /**
     * 
     * @param path 
     * @param middle 
     * @param controller 
     * @returns 
     */
    public post: RouterParams = (path: string, middle?: Function, controller?: Function): PyzRouter =>  {
     
        this.app.app.post(path, (req, res, next)=>{
            if(middle) { //middle 可能就是Controller
                middle(req, res, next);
                next();
                if(controller) controller({req, res}); 
            }
        });

        return this;
    }
}