import { Application } from "./lib/Application";

export default (app: Application)=>{
    const { router, io, controller, } = app;

    router.get('/', controller.Home.index);
    router.get('/wscf', controller.Home.doSome);
    
}