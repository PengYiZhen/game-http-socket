import { Application } from "../lib/Application";
import { Server, Socket } from "socket.io";
import { socketEvent } from "./socketEventConfig";

export default (app: Application)=>{
    regstrySaloon(app.io);
}
 
/**
 * @regstrySaloon 大厅
 */
function regstrySaloon(io: Server) {
  const nameSpaceRoom = 'saloon';  
  // let rooms: Map<string, any> = new Map(); // 多房间管理 浏览器刷新需要缓存， 其他平用map
  let rooms: Array<string> = [];
  // 连接空间
  io.of('/'+nameSpaceRoom).on(socketEvent.connection, (socket: Socket)=>{
     if(socket.handshake.query.room) socket.join(socket.handshake.query.room);
     rooms = []; //《浏览器刷新测试》 注意控制这个地方 容易造成上次缓存 需要写在断开连接空置或者清理
     rooms.push(<string>socket.handshake.query.room);
     socket.emit(socketEvent.connection, {userId: socket.id, })
     console.log('Room', socket.handshake.query.room);
     // 空间中的事件
     const event = socketEvent.gameRoom1;
     socket.on(event, (msg)=>{
        console.log(socket.id)
        console.log(msg) 
        // socket.emit(event, msg); 单波
        console.log(event)
        // socket.to(nameSpaceRoom).emit(event, msg) // 广播不包含自己
        socket.to(rooms[0]).emit(event, msg); // 其他人
        socket.send(msg); // 自己
     });
  });

}